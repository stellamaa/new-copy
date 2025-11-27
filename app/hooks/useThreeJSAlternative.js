'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { mediaFiles } from '../constants/mediaFiles';
import { createEventListenerManager } from '../utils/eventListeners';

export function useThreeJSAlternative(containerRef, onMediaClick, isGridMode) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const attachmentsRef = useRef([]);
  const floatingTextsRef = useRef([]);
  const raycasterRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());
  const animationFrameIdRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || isGridMode) {
      // Don't initialize if in grid mode
      return;
    }

    const container = containerRef.current;
    const { registerListener, registerCleanup, cleanup: cleanupListeners } = createEventListenerManager();

    function init() {
      // Scene
      sceneRef.current = new THREE.Scene();
      
      // Camera
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.set(0, 5, 10);
      cameraRef.current.lookAt(0, 0, 0);

      // Renderer with transparent background
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0x000000, 0); // Transparent background
      rendererRef.current.shadowMap.enabled = true;
      rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;
      
      container.appendChild(rendererRef.current.domElement);

      // Raycaster
      raycasterRef.current = new THREE.Raycaster();

      // Create environment
      createEnvironment();
      
      // Create attachments from media files
      createAttachments();
      
      // Setup controls
      setupControls();
      
      initializedRef.current = true;
    }

    function createEnvironment() {
      // Create particle system
      createParticleField();
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      sceneRef.current.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      sceneRef.current.add(directionalLight);
      
      const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 50);
      pointLight1.position.set(-10, 10, -10);
      sceneRef.current.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0xffffff, 0.5, 50);
      pointLight2.position.set(10, -10, 10);
      sceneRef.current.add(pointLight2);
    }

    function createParticleField() {
      const particleCount = 1000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 200;
        positions[i3 + 1] = (Math.random() - 0.5) * 200;
        positions[i3 + 2] = (Math.random() - 0.5) * 200;
        
        const intensity = Math.random() * 0.5 + 0.5;
        colors[i3] = intensity;
        colors[i3 + 1] = intensity;
        colors[i3 + 2] = intensity;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      sceneRef.current.add(particleSystem);
    }



    function createAttachments() {
      // Create media file attachments
      mediaFiles.forEach((media, index) => {
        const attachment = createAttachment(media, index);
        attachmentsRef.current.push(attachment);
        sceneRef.current.add(attachment);
      });

      // Create floating text elements (from original 3D code)
      const floatingTexts = [
        'REACT, SANITY',
        'TYPESCRIPT, FIGMA',
        'WEBGL, P5.JS',
        'FINDING AND KEEPING BALANCE',
        'ARENT WE ALL JUST FLOATING IN SPACE?',
        'ALWAYS LEARNING',
        'ASK ME ANYTHING',
        'HI'
      ];

      // Check initial theme state
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      floatingTexts.forEach((text, index) => {
        const textMesh = createFloatingText(text, index, isDarkMode);
        floatingTextsRef.current.push({ mesh: textMesh, text: text });
        sceneRef.current.add(textMesh);
      });
    }

    function createAttachment(media, index) {
      const group = new THREE.Group();
      
      if (media.type === 'image') {
        createImagePreview(group, media);
      } else if (media.type === 'video') {
        createVideoPreview(group, media);
      }

      // Position objects closer together in 3D space (reduced range from 30/20/30 to 15/10/15)
      group.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15
      );
      
      group.rotation.set(
        Math.random() * Math.PI * 0.5,
        Math.random() * Math.PI * 0.5,
        Math.random() * Math.PI * 0.5
      );

      group.userData = {
        type: media.type,
        src: media.src,
        url: media.url || null,
        originalScale: group.scale.clone(),
        hoverScale: new THREE.Vector3(1.2, 1.2, 1.2),
        media: media
      };

      return group;
    }

    function createImagePreview(group, media) {
      const geometry = new THREE.PlaneGeometry(2, 2.5);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(media.src);
      
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.9
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }

    function createVideoPreview(group, media) {
      const geometry = new THREE.PlaneGeometry(2, 2.5);
      
      // Create video element
      const video = document.createElement('video');
      video.src = media.src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      
      const material = new THREE.MeshBasicMaterial({ 
        map: videoTexture,
        transparent: true,
        opacity: 0.9
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      
      // Store video reference
      group.userData.video = video;
      
      // Play video
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    }

    function createFloatingText(text, index, isDark = false) {
      // Create canvas for text rendering
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 128;
      
      // Determine text color based on theme: dark text in light mode, light text in dark mode
      const textColor = isDark ? '#ffffff' : '#000000';
      
      // Draw text on canvas
      context.fillStyle = textColor;
      context.font = 'bold 48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.8
      });
      
      // Create plane geometry for text
      const geometry = new THREE.PlaneGeometry(4, 1);
      const mesh = new THREE.Mesh(geometry, material);
      
      // Store canvas and context for later updates
      mesh.userData.canvas = canvas;
      mesh.userData.context = context;
      mesh.userData.text = text;
      mesh.userData.material = material;
      
      // Position floating text closer together (reduced range from 40/30/40 to 20/15/20)
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      );
      
      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI * 0.3,
        Math.random() * Math.PI * 0.3,
        Math.random() * Math.PI * 0.3
      );

      return mesh;
    }

    function updateTextColors(isDark) {
      // Update all floating text colors based on theme
      floatingTextsRef.current.forEach(({ mesh }) => {
        const canvas = mesh.userData.canvas;
        const context = mesh.userData.context;
        const text = mesh.userData.text;
        
        if (!canvas || !context) return;
        
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Determine text color: dark text in light mode, light text in dark mode
        const textColor = isDark ? '#ffffff' : '#000000';
        
        // Redraw text with new color
        context.fillStyle = textColor;
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        // Update texture
        if (mesh.userData.material.map) {
          mesh.userData.material.map.needsUpdate = true;
        }
      });
    }

    function setupControls() {
      controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;
      controlsRef.current.enableZoom = true;
      controlsRef.current.enablePan = false;
      controlsRef.current.maxPolarAngle = Math.PI * 0.8;
      controlsRef.current.minPolarAngle = Math.PI * 0.2;
    }

    function handleMouseMove(event) {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(attachmentsRef.current);
      
      if (intersects.length > 0) {
        const attachment = intersects[0].object.parent;
        hoverAttachment(attachment);
      } else {
        unhoverAllAttachments();
      }
    }

    function handleClick(event) {
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(attachmentsRef.current);
      
      if (intersects.length > 0) {
        const attachment = intersects[0].object.parent;
        if (onMediaClick) {
          onMediaClick(attachment.userData.media);
        }
      }
    }

    function hoverAttachment(attachment) {
      attachment.scale.lerp(attachment.userData.hoverScale, 0.1);
    }

    function unhoverAllAttachments() {
      attachmentsRef.current.forEach(attachment => {
        attachment.scale.lerp(attachment.userData.originalScale, 0.1);
      });
    }

    function handleResize() {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      if (!initializedRef.current) return;
      
      animationFrameIdRef.current = requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Rotate attachments slowly
      attachmentsRef.current.forEach((attachment, index) => {
        attachment.rotation.y += 0.005 + index * 0.001;
        attachment.rotation.x += 0.002;
      });
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }

    function dispose() {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      attachmentsRef.current.forEach((attachment) => {
        if (attachment.userData?.video) {
          const video = attachment.userData.video;
          video.pause();
          video.src = '';
          video.load();
        }
        
        attachment.traverse((child) => {
          if (child.material) {
            if (child.material.map) {
              child.material.map.dispose();
            }
            child.material.dispose();
          }
          if (child.geometry) {
            child.geometry.dispose();
          }
        });
      });

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (rendererRef.current && rendererRef.current.domElement) {
        const canvas = rendererRef.current.domElement;
        const currentContainer = containerRef.current;
        if (currentContainer && canvas && canvas.parentNode === currentContainer) {
          try {
            currentContainer.removeChild(canvas);
          } catch (e) {
            // Element may have already been removed or is not a child
            // This is safe to ignore
          }
        }
        rendererRef.current.dispose();
      }

      attachmentsRef.current = [];
      floatingTextsRef.current = [];
      initializedRef.current = false;
    }

    // Initialize
    init();
    animate();

    // Event listeners
    if (rendererRef.current?.domElement) {
      registerListener(rendererRef.current.domElement, 'mousemove', handleMouseMove);
      registerListener(rendererRef.current.domElement, 'click', handleClick);
    }
    registerListener(window, 'resize', handleResize);
    
    // Listen for theme changes
    const handleThemeChange = (event) => {
      const isDark = event.detail?.isDark ?? document.documentElement.classList.contains('dark');
      updateTextColors(isDark);
    };
    registerListener(window, 'themeChange', handleThemeChange);

    registerCleanup(() => {
      dispose();
    });

    return () => {
      cleanupListeners();
      dispose();
    };
  }, [containerRef, onMediaClick, isGridMode]);
}


'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { mediaFiles } from '../constants/mediaFiles';
import { positions, rotations, forwardTilt, tiltAttributes } from '../constants/threeJSConfig';
import { createEventListenerManager } from '../utils/eventListeners';

export function useThreeJS(onMediaClick) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const planesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const spiralGroupRef = useRef(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const windowHalfXRef = useRef(0);
  const windowHalfYRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    windowHalfXRef.current = window.innerWidth / 2;
    windowHalfYRef.current = window.innerHeight / 2;

    const { registerListener, registerTimeout, registerCleanup, cleanup: cleanupListeners } = createEventListenerManager();

    function disposeThree() {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      planesRef.current.forEach((plane) => {
        if (plane.userData?.video) {
          const video = plane.userData.video;
          try {
            video.pause();
            video.src = '';
            video.load();
          } catch (e) {
            // ignore errors during cleanup
          }
        }
        if (plane.material?.map) {
          plane.material.map.dispose();
        }
        if (plane.material) {
          plane.material.dispose();
        }
        if (plane.geometry) {
          plane.geometry.dispose();
        }
      });
      planesRef.current = [];

      if (spiralGroupRef.current && sceneRef.current) {
        sceneRef.current.remove(spiralGroupRef.current);
        spiralGroupRef.current = null;
      }

      if (rendererRef.current) {
        const canvas = rendererRef.current.domElement;
        if (canvas?.parentElement) {
          canvas.parentElement.removeChild(canvas);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      sceneRef.current = null;
      cameraRef.current = null;
    }

    function createMediaPlanes() {
      if (!sceneRef.current) return;

      let textureLoader = null;
      try {
        textureLoader = new THREE.TextureLoader();
      } catch (error) {
        console.error('Failed to create texture loader', error);
        return;
      }

      const isMobileView = window.innerWidth <= 768;

      if (isMobileView) {
        // Mobile: Create vertical helix line
        spiralGroupRef.current = new THREE.Group();
        sceneRef.current.add(spiralGroupRef.current);

        const turns = 10;
        const points = mediaFiles.length;
        const verticalStep = 20;
        const startY = 300;

        mediaFiles.forEach((media, index) => {
          const angle = (index / points) * Math.PI * 2 * turns;
          const y = startY - index * verticalStep;
          const x = 0;
          const z = 0;

          const geometry = new THREE.PlaneGeometry(180, 50);
          let material;
          let videoElement = null;

          if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.crossOrigin = 'anonymous';
            video.playsInline = true;

            registerListener(video, 'loadeddata', () => {
              video.play().catch(() => {
                const playHandler = () => {
                  video.play().catch(() => {});
                };
                registerListener(document, 'click', playHandler, { once: true });
              });
            });

            videoElement = video;

            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;

            material = new THREE.MeshBasicMaterial({
              map: videoTexture,
              transparent: true,
              side: THREE.DoubleSide
            });
          } else {
            const texture = textureLoader.load(
              media.src,
              undefined,
              undefined,
              () => {}
            );
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            material = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              side: THREE.DoubleSide
            });
          }

          const plane = new THREE.Mesh(geometry, material);
          plane.position.set(x, y, z);
          plane.rotation.y = angle;

          plane.userData = {
            media,
            index,
            video: videoElement,
            initialAngle: angle,
            initialY: y
          };

          spiralGroupRef.current.add(plane);
          planesRef.current.push(plane);
        });
      } else {
        // Desktop: Original positioning
        mediaFiles.forEach((media, index) => {
          const geometry = new THREE.PlaneGeometry(2.5, 1.7);
          let material;
          let videoElement = null;

          if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.crossOrigin = 'anonymous';
            video.playsInline = true;

            registerListener(video, 'loadeddata', () => {
              video.play().catch(() => {
                const playHandler = () => {
                  video.play().catch(() => {});
                };
                registerListener(document, 'click', playHandler, { once: true });
              });
            });

            videoElement = video;

            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;

            material = new THREE.MeshBasicMaterial({
              map: videoTexture,
              side: THREE.DoubleSide
            });
          } else {
            const texture = textureLoader.load(
              media.src,
              undefined,
              undefined,
              () => {}
            );
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            material = new THREE.MeshBasicMaterial({
              map: texture,
              side: THREE.DoubleSide
            });
          }

          const plane = new THREE.Mesh(geometry, material);
          const position = positions[index] || { x: 0, y: 0, z: 0 };
          const rotation = rotations[index] || { x: 0, y: 0, z: 0 };
          plane.position.set(position.x, position.y, position.z);
          plane.rotation.set(rotation.x, rotation.y, rotation.z);

          plane.userData = {
            media,
            index,
            video: videoElement,
            tiltAttributes: tiltAttributes[index] || { scale: 1 },
            forwardTilt: forwardTilt[index] || { hasForwardTilt: false, tiltAmount: 0 }
          };

          sceneRef.current.add(plane);
          planesRef.current.push(plane);
        });
      }
    }

    function onMouseMove(event) {
      mouseXRef.current = (event.clientX - windowHalfXRef.current) * 0.01;
      mouseYRef.current = (event.clientY - windowHalfYRef.current) * 0.01;
    }

    function onWindowResize() {
      windowHalfXRef.current = window.innerWidth / 2;
      windowHalfYRef.current = window.innerHeight / 2;

      if (!cameraRef.current || !rendererRef.current) {
        return;
      }

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      animationFrameIdRef.current = window.requestAnimationFrame(animate);
      if (!cameraRef.current || !rendererRef.current) {
        return;
      }

      const isMobileView = window.innerWidth <= 768;

      if (isMobileView && spiralGroupRef.current) {
        const downwardSpeed = 0.5;
        const rotationSpeed = 0.002;

        spiralGroupRef.current.position.y -= downwardSpeed * 0.016;

        spiralGroupRef.current.rotation.y += rotationSpeed;

        if (spiralGroupRef.current.position.y < -400) {
          spiralGroupRef.current.position.y = 300;
        }

        planesRef.current.forEach((plane) => {
          if (plane.userData?.video && plane.material?.map) {
            const video = plane.userData.video;
            if (video.readyState >= 2) {
              if (video.paused) {
                video.play().catch(() => {});
              }
              plane.material.map.needsUpdate = true;
            }
          }
        });
      } else {
        const time = Date.now() * 0.001;
        const groupRotationY = time * 0.0204;
        const groupRotationX = Math.sin(time * 0.3) * 0.1;
        const groupRotationZ = Math.cos(time * 0.2) * 0;

        planesRef.current.forEach((plane) => {
          plane.rotation.y = groupRotationY;
          plane.rotation.x = groupRotationX;
          plane.rotation.z = groupRotationZ;

          const forwardTiltData = plane.userData.forwardTilt;
          if (forwardTiltData?.hasForwardTilt) {
            plane.rotation.x += forwardTiltData.tiltAmount;
          }

          const tiltAttrs = plane.userData.tiltAttributes;
          if (tiltAttrs?.scale) {
            plane.scale.setScalar(tiltAttrs.scale);
          }

          if (plane.userData?.video && plane.material?.map) {
            const video = plane.userData.video;
            if (video.readyState >= 2) {
              if (video.paused) {
                video.play().catch(() => {});
              }
              plane.material.map.needsUpdate = true;
            }
          }
        });

        cameraRef.current.position.x += (mouseXRef.current * 0.05 - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (-mouseYRef.current * 0.05 - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(sceneRef.current.position);
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    function init() {
      if (initializedRef.current) {
        return;
      }

      const container = document.getElementById('three-container');
      if (!container) {
        return;
      }

      const isMobileView = window.innerWidth <= 768;

      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);

      if (isMobileView) {
        cameraRef.current.position.set(0, 0, 200);
        cameraRef.current.rotation.x = -0.25;
      } else {
        cameraRef.current.position.set(0, 0, 5);
      }

      rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      const isDark = document.documentElement.classList.contains('dark');
      rendererRef.current.setClearColor(isDark ? 0x4a4a4a : 0xffffff, 1);
      container.appendChild(rendererRef.current.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      sceneRef.current.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      sceneRef.current.add(directionalLight);

      createMediaPlanes();

      registerListener(document, 'mousemove', onMouseMove, false);
      registerListener(window, 'resize', onWindowResize, false);

      animate();

      const timeoutId = window.setTimeout(() => {
        planesRef.current.forEach((plane) => {
          if (plane.userData?.video) {
            const video = plane.userData.video;
            if (video.readyState >= 2) {
              video.play().catch(() => {});
            }
          }
        });
      }, 1000);
      registerTimeout(timeoutId);

      initializedRef.current = true;
    }

    function handleMouseClick(event) {
      const target = event.target;

      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('.close-development') || target.closest('.close-modal')) {
        return;
      }

      const developmentPage = document.getElementById('development-page');
      if (!developmentPage || !developmentPage.classList.contains('active')) {
        return;
      }

      const threeContainer = document.getElementById('three-container');
      if (!threeContainer || (!threeContainer.contains(target) && !developmentPage.contains(target))) {
        return;
      }

      if (!cameraRef.current || !sceneRef.current) {
        return;
      }

      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(planesRef.current);

      if (intersects.length > 0) {
        const clickedPlane = intersects[0].object;
        const media = clickedPlane.userData.media;
        if (onMediaClick) {
          onMediaClick(media);
        }
      }
    }

    // Listen for initialization event
    const handleInitThreeJS = () => {
      if (!initializedRef.current) {
        init();
      }
    };

    // Listen for theme changes
    const handleThemeChange = (event) => {
      if (rendererRef.current) {
        rendererRef.current.setClearColor(event.detail.isDark ? 0x4a4a4a : 0xffffff, 1);
      }
    };

    // Use custom event listeners
    const initHandler = () => handleInitThreeJS();
    const themeHandler = (e) => handleThemeChange(e);
    
    window.addEventListener('initThreeJS', initHandler);
    window.addEventListener('themeChange', themeHandler);
    registerListener(document, 'click', handleMouseClick);
    
    registerCleanup(() => {
      window.removeEventListener('initThreeJS', initHandler);
      window.removeEventListener('themeChange', themeHandler);
    });

    return () => {
      cleanupListeners();
      disposeThree();
      initializedRef.current = false;
    };
  }, [onMediaClick]);
}


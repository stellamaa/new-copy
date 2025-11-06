// Three.js Scene with Rotating Images and Videos
let scene, camera, renderer, planes = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Media files to display (all available files)
const mediaFiles = [
    { src: 'assets/fionavideo.mov', type: 'video', url: 'https://fionaalbrow.com' },
    { src: 'assets/image1.png', type: 'image' },
    { src: 'assets/rielavideo.mov', type: 'video', url: 'https://rielaspaces.com' },
    { src: 'assets/img3.png', type: 'image' },
    { src: 'assets/stellavideo.mov', type: 'video', url: 'https://stellamathioudakis.com' },
    { src: 'assets/image15.png', type: 'image' },
    { src: 'assets/image16.png', type: 'image' }, 
    { src: 'assets/img20.png', type: 'image' },
    { src: 'assets/img8.png', type: 'image' }
];

// Initialize Three.js scene
function init() {
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded!');
        return;
    }
    
    // Create scene
    scene = new THREE.Scene();
    console.log('Scene created');
    
    // Create camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    console.log('Camera created at position:', camera.position);
    
    // Create renderer - use the container in the development page
    const container = document.getElementById('three-container');
    if (!container) {
        console.error('Three.js container not found!');
        return;
    }
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Set initial clear color based on theme
    const isDark = document.documentElement.classList.contains('dark');
    renderer.setClearColor(isDark ? 0x4a4a4a : 0xffffff, 1); // Use lighter grey for consistency
    container.appendChild(renderer.domElement);
    console.log('Renderer created and added to container');
    
    // Add basic lighting first
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    console.log('Lighting added');
    
 
    
    // Create planes with media
    createMediaPlanes();
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation loop
    console.log('Starting animation loop...');
    animate();
    
    // Start all videos after a short delay to ensure they're loaded
    setTimeout(() => {
        planes.forEach(plane => {
            if (plane.userData && plane.userData.video) {
                const video = plane.userData.video;
                if (video.readyState >= 2) {
                    video.play().catch(e => console.log('Video play failed:', e));
                }
            }
        });
    }, 1000);
}

function createMediaPlanes() {
    // Position planes in 3D space to accommodate 14 files - closer together
    const positions = [
        { x: -0.24, y: 0.88, z: 0 },      // 20% closer
        { x: -0.4, y: 0.16, z: 0 },
        { x: -0.64, y: -0.4, z: 0 },
        { x: 0.8, y: -0.4, z: 0 },
        { x: 0.16, y: 0.8, z: 0 },
        { x: 0, y: -0.8, z: 0 },
        { x: 0, y: 0.16, z: 0 },
        { x: 0.32, y: 0.4, z: 0 },
        { x: 0.88, y: -0.08, z: 0 },
        { x: -0.4, y: -0.08, z: 0 },
        { x: -0.16, y: 0, z: 0 },
        { x: 0.4, y: 0.16, z: 0 },
        { x: -0.4, y: 0.4, z: 0 },
        { x: 0.4, y: 0, z: 0 }
    ];
    
    // Subtle tilted rotations for unified group effect
    const rotations = [
        { x: 0.1, y: 0.1, z: 0.05 },
        { x: -0.1, y: 0.1, z: 0.05 },
        { x: 0.1, y: -0.1, z: 0.05 },
        { x: -0.1, y: -0.1, z: 0.05 },
        { x: 0.05, y: 0.15, z: 0.1 },
        { x: -0.05, y: -0.15, z: 0.1 },
        { x: 0.15, y: 0.05, z: -0.05 },
        { x: -0.15, y: 0.05, z: -0.05 },
        { x: 0.05, y: -0.15, z: 0.1 },
        { x: -0.05, y: 0.15, z: 0.1 },
        { x: 0.1, y: 0.05, z: 0.15 },
        { x: -0.1, y: 0.05, z: 0.15 },
        { x: 0.05, y: 0.1, z: -0.1 },
        { x: -0.05, y: 0.1, z: -0.1 }
    ];
    
    // Add forward tilt attributes for selected objects
    const forwardTilt = [
        { hasForwardTilt: false, tiltAmount: 0 },
        { hasForwardTilt: true, tiltAmount: 1 },
        { hasForwardTilt: false, tiltAmount: 0 },
        { hasForwardTilt: true, tiltAmount: 0.25 },
        { hasForwardTilt: false, tiltAmount: 0 },
        { hasForwardTilt: true, tiltAmount: 0.35 },
        { hasForwardTilt: false, tiltAmount: 1 },
        { hasForwardTilt: true, tiltAmount: 0.2 },
        { hasForwardTilt: false, tiltAmount: 0 },
        { hasForwardTilt: true, tiltAmount: 0.4 },
        { hasForwardTilt: false, tiltAmount: 0 },
        { hasForwardTilt: true, tiltAmount: 0.28 },
        { hasForwardTilt: false, tiltAmount: 0 },
        { hasForwardTilt: true, tiltAmount: 0.32 }
    ];
    
    // Simplified attributes for unified group rotation
    const tiltAttributes = [
        { scale: 1.0 },
        { scale: 0.95 },
        { scale: 1.05 },
        { scale: 0.9 },
        { scale: 1.1 },
        { scale: 0.85 },
        { scale: 0.98 },
        { scale: 1.02 },
        { scale: 1.08 },
        { scale: 0.92 },
        { scale: 1.03 },
        { scale: 0.97 },
        { scale: 1.06 },
        { scale: 0.94 }
    ];
    
    console.log('Creating media planes...', mediaFiles);
    
    mediaFiles.forEach((media, index) => {
        console.log(`Creating plane ${index}:`, media);
        const geometry = new THREE.PlaneGeometry(2.5, 1.7); // 10% bigger
        let material;
        
        if (media.type === 'video') {
            // Create video element
            const video = document.createElement('video');
            video.src = media.src;
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.crossOrigin = 'anonymous';
            video.playsInline = true; // Important for mobile devices
            
            video.addEventListener('error', (e) => {
                console.error('Video load error:', media.src, e);
            });
            
            video.addEventListener('loadeddata', () => {
                console.log('Video loaded:', media.src);
                // Ensure video starts playing
                video.play().catch(e => {
                    console.log('Video autoplay prevented:', e);
                    // If autoplay fails, try to play on user interaction
                    document.addEventListener('click', () => {
                        video.play().catch(err => console.log('Video play failed:', err));
                    }, { once: true });
                });
            });
            
            // Store video reference
            videoElement = video;
            
            // Create video texture
            const videoTexture = new THREE.VideoTexture(video);
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            
            material = new THREE.MeshBasicMaterial({ 
                map: videoTexture,
                side: THREE.DoubleSide
            });
        } else {
            // Create image texture
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(
                media.src,
                (texture) => {
                    console.log('Image loaded:', media.src);
                },
                undefined,
                (error) => {
                    console.error('Image load error:', media.src, error);
                }
            );
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            
            material = new THREE.MeshBasicMaterial({ 
                map: texture,
                side: THREE.DoubleSide
            });
        }
        
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(positions[index].x, positions[index].y, positions[index].z);
        plane.rotation.set(rotations[index].x, rotations[index].y, rotations[index].z);
        
        // Store media info for click handling and tilt attributes
        plane.userData = { 
            media: media, 
            index: index, 
            video: videoElement,
            tiltAttributes: tiltAttributes[index],
            forwardTilt: forwardTilt[index]
        };
        
        scene.add(plane);
        planes.push(plane);
        console.log(`Plane ${index} added to scene:`, plane.position, plane.rotation, plane.material);
    });
    
    console.log('Total planes created:', planes.length);
}

function animate() {
    requestAnimationFrame(animate);
    
    
    // Rotate all planes together as one unit, slowly
    const time = Date.now() * 0.001;
    const groupRotationY = time * 0.0204; // 2% faster rotation
    const groupRotationX = Math.sin(time * 0.3) * 0.1; // Gentle group tilt
    const groupRotationZ = Math.cos(time * 0.2) * 0; // Gentle group wobble
    
    planes.forEach((plane, index) => {
        // All planes rotate together as one group
        plane.rotation.y = groupRotationY;
        plane.rotation.x = groupRotationX;
        plane.rotation.z = groupRotationZ;
        
        // Apply forward tilt to selected objects
        const forwardTiltData = plane.userData.forwardTilt;
        if (forwardTiltData.hasForwardTilt) {
            // Add forward tilt (positive X rotation) to the group rotation
            plane.rotation.x += forwardTiltData.tiltAmount;
        }
        
        // Apply static scale variation for visual interest
        const tiltAttrs = plane.userData.tiltAttributes;
        plane.scale.setScalar(tiltAttrs.scale);
        
        // Update video textures to show current frames
        if (plane.userData && plane.userData.video) {
            const video = plane.userData.video;
            if (video.readyState >= 2) { // Video has loaded data
                // Ensure video is playing
                if (video.paused) {
                    video.play().catch(e => console.log('Video play failed:', e));
                }
                // Update the texture to show current video frame
                if (plane.material.map) {
                    plane.material.map.needsUpdate = true;
                }
            }
        }
    });
    
    // Camera movement based on mouse (reduced sensitivity for closer view)
    camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.01;
    mouseY = (event.clientY - windowHalfY) * 0.01;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Letter reversing/scrambling effect for navigation
function reverseText(element, originalText) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let iterations = 0;
    const maxIterations = 30;
    const interval = 30;
    
    if (element.scrambleInterval) {
        clearInterval(element.scrambleInterval);
    }
    
    element.scrambleInterval = setInterval(() => {
        if (iterations < maxIterations) {
            // Scramble phase
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
        } else {
            // Reveal original text
            element.textContent = originalText;
            clearInterval(element.scrambleInterval);
            element.scrambleInterval = null;
        }
        
        iterations++;
    }, interval);
}

// Raycasting for click detection
function onMouseClick(event) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(planes);
    
    if (intersects.length > 0) {
        const clickedPlane = intersects[0].object;
        const media = clickedPlane.userData.media;
        
        if (media.type === 'video' && media.url) {
            // Open video URL in new tab
            window.open(media.url, '_blank');
        } else if (media.type === 'image') {
            // Show image in fullscreen modal
            showFullscreenImage(media.src);
        }
    }
}

function showFullscreenImage(imageSrc) {
    const modal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeDevelopment = document.getElementById('close-development');
    
    if (modal && fullscreenImage) {
        fullscreenImage.src = imageSrc;
        modal.classList.add('active');
        
        // Hide the close development button when modal opens
        if (closeDevelopment) {
            closeDevelopment.style.display = 'none';
        }
    }
}

function closeFullscreenModal() {
    const modal = document.getElementById('fullscreen-modal');
    const closeDevelopment = document.getElementById('close-development');
    
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Show the close development button when modal closes
    if (closeDevelopment) {
        closeDevelopment.style.display = '';
    }
}

// Initialize development text warping
function initializeDevelopmentTextWarp() {
    const developmentText = document.querySelector('.development-text p');
    if (!developmentText) return;
    
    const text = developmentText.textContent;
    developmentText.textContent = '';
    
    // Split text into characters and create spans
    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
        return span;
    });
    
    developmentText.append(...chars);
    
    // Warp on hover
    developmentText.addEventListener('mouseenter', function() {
        chars.forEach((char, index) => {
            if (char.textContent === '\u00A0') return; // Skip spaces
            
            // Random distortion values
            const translateX = (Math.random() - 0.9) * 10;
            const translateY = (Math.random() - 0.2) * 10;
            const rotate = (Math.random() - 0.2) * 45;
            
            char.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
        });
    });
    
    // Return to original position on mouse leave
    developmentText.addEventListener('mouseleave', function() {
        chars.forEach((char) => {
            char.style.transform = 'translate(0px, 0px) rotate(0deg)';
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize navigation with character spans
    initializeNavigation();

    // Initialize theme from storage and wire toggle
    initializeThemeToggle();
    
    // Initialize development text warping
    initializeDevelopmentTextWarp();
    
    // Initialize random images on landing page
    initializeRandomImages();
    
    // Add event listeners after DOM is ready
    document.addEventListener('click', onMouseClick);
    
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', closeFullscreenModal);
    }
    
    const fullscreenModal = document.getElementById('fullscreen-modal');
    if (fullscreenModal) {
        fullscreenModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeFullscreenModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (isAboutOpen) {
                closeAboutPage();
            } else {
            closeFullscreenModal();
            }
        }
    });
    
    // Navigation functionality
    const navName = document.getElementById('nav-name');
    if (navName) {
        navName.addEventListener('click', function(e) {
            e.preventDefault();
            goToLanding();
            });
    }
    
    const navDevelopment = document.getElementById('nav-development');
    if (navDevelopment) {
        navDevelopment.addEventListener('click', function(e) {
                e.preventDefault();
            goToDevelopment();
            });
        }
    
    const navArt = document.getElementById('nav-art');
    if (navArt) {
        navArt.addEventListener('click', function(e) {
            e.preventDefault();
            toggleArt();
        });
    }
    
    const navAbout = document.getElementById('nav-about');
    if (navAbout) {
        navAbout.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAbout();
        });
    }
    
    const closeAbout = document.getElementById('close-about');
    if (closeAbout) {
        closeAbout.addEventListener('click', function(e) {
            e.preventDefault();
            closeAboutPage();
        });
    }
    
    const closeArt = document.getElementById('close-art');
    if (closeArt) {
        closeArt.addEventListener('click', function(e) {
            e.preventDefault();
            const artPage = document.getElementById('art-page');
            if (artPage) {
                artPage.classList.remove('active');
            }
            isArtOpen = false;
            goToLanding(); // Return to landing page with random images
        });
    }
    
    // Media preview functionality
    initializeMediaPreview();
    
    // Music play/pause functionality
    initializeMusicPlayer();

    // Close Development overlay
    const closeDevelopment = document.getElementById('close-development');
    if (closeDevelopment) {
        closeDevelopment.addEventListener('click', function(e) {
            e.preventDefault();
            const developmentPage = document.getElementById('development-page');
            if (developmentPage) {
                developmentPage.classList.remove('active');
            }
            goToLanding(); // Return to landing page with random images
        });
    }
});

// Navigation functionality
let isAboutOpen = false;
// UNUSED: let currentPage = 'landing'; // Variable is set but never actually used

// Upside-down character mapping
const upsideDownChars = {
    'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
    'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
    'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
    'y': 'ʎ', 'z': 'z', ' ': ' ', '-': '-', '/': '/', ':': ':', '&': '&'
};

function initializeNavigation() {
    const navItems = [
        { id: 'nav-name', text: 'stella mathioudakis' },
        { id: 'nav-development', text: 'code + design' },
        { id: 'nav-art', text: 'art' },
        { id: 'nav-about', text: 'about' }
    ];
    
    navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            // Create spans for each character
            const chars = item.text.split('').map(char => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.display = 'inline-block';
                span.style.transition = 'transform 0.3s ease';
                return span;
            });
            
            element.append(...chars);
            
            // Add hover effects
            element.addEventListener('mouseenter', function() {
                chars.forEach(span => {
                    const originalChar = span.textContent.toLowerCase();
                    const upsideDownChar = upsideDownChars[originalChar] || originalChar;
                    span.textContent = upsideDownChar;
                    span.style.transform = 'rotate(180deg)';
                });
            });
            
            element.addEventListener('mouseleave', function() {
                chars.forEach(span => {
                    span.style.transform = 'rotate(0deg)';
                    // Restore original character after a short delay
                    setTimeout(() => {
                        span.textContent = item.text[chars.indexOf(span)];
                    }, 300);
                });
            });
            }
        });
    }

function goToLanding() {
    const landingPage = document.getElementById('landing-page');
    const developmentPage = document.getElementById('development-page');
        const aboutPage = document.getElementById('about-page');
    const artPage = document.getElementById('art-page');
    const nav = document.querySelector('.nav');
    
    // Hide all pages
    developmentPage.classList.remove('active');
    aboutPage.classList.remove('active');
    if (artPage) artPage.classList.remove('active');
    isAboutOpen = false;
    isArtOpen = false;
    
    // Show landing page
    landingPage.style.display = 'flex';
    if (nav) nav.style.display = 'flex'; // Show nav
    currentPage = 'landing';
    
    // Reload random images when returning to landing page
    if (typeof window.reloadRandomImages === 'function') {
        window.reloadRandomImages();
    }
}

function goToDevelopment() {
    const landingPage = document.getElementById('landing-page');
    const developmentPage = document.getElementById('development-page');
    
    // Hide landing page
    landingPage.style.display = 'none';
    
    // Show development page with slide animation
    developmentPage.classList.add('active');
    currentPage = 'development';
    
    // Initialize Three.js if not already done
    if (!scene) {
        init();
    }
}

// UNUSED FUNCTION - Never called
function goToMusic() {
    // Placeholder for music page
    console.log('Music page - coming soon');
    }
    
// UNUSED FUNCTION - Never called
function goToInstallations() {
    // Placeholder for installations page
    console.log('Installations page - coming soon');
}

let isArtOpen = false;
function toggleArt() {
    const artPage = document.getElementById('art-page');
    const nav = document.querySelector('.nav');
    if (!artPage) return;
    if (isArtOpen) {
        artPage.classList.remove('active');
        isArtOpen = false;
        goToLanding(); // Return to landing page with random images
    } else {
        artPage.classList.add('active');
        isArtOpen = true;
        if (nav) nav.style.display = 'none'; // Hide nav
    }
}

function toggleAbout() {
    const aboutPage = document.getElementById('about-page');
    const nav = document.querySelector('.nav');
    
    if (isAboutOpen) {
        aboutPage.classList.remove('active');
        isAboutOpen = false;
        goToLanding(); // Return to landing page with random images
    } else {
            aboutPage.classList.add('active');
        isAboutOpen = true;
        if (nav) nav.style.display = 'none'; // Hide nav
    }
}

function closeAboutPage() {
    const aboutPage = document.getElementById('about-page');
    const nav = document.querySelector('.nav');
    aboutPage.classList.remove('active');
    isAboutOpen = false;
    goToLanding(); // Return to landing page with random images
}

// Media preview functionality
function initializeMediaPreview() {
    const isMobile = window.innerWidth <= 768;
    
    // Restriction media preview
    const restrictionRow = document.querySelector('.restriction-row');
    const mediaPreview = document.getElementById('media-preview');
    const ktVideo = document.getElementById('kt-video');
    const sculptureVideo = document.getElementById('sculpture-video');
    const flawPreview = document.getElementById('flaw-media-preview');
    
    if (restrictionRow && mediaPreview) {
        const showRestriction = () => {
            // Hide other previews first
            const genderPreview = document.getElementById('gender-media-preview');
            if (genderPreview) genderPreview.classList.remove('active');
            if (flawPreview) flawPreview.classList.remove('active');
            
            mediaPreview.classList.add('active');
            
            // Start playing videos
            if (ktVideo) {
                ktVideo.play().catch(e => console.log('KT video play failed:', e));
            }
            if (sculptureVideo) {
                sculptureVideo.play().catch(e => console.log('Sculpture video play failed:', e));
            }
        };
        const hideRestriction = () => {
            mediaPreview.classList.remove('active');
            
            // Pause videos
            if (ktVideo) {
                ktVideo.pause();
            }
            if (sculptureVideo) {
                sculptureVideo.pause();
            }
        };

        // Desktop hover
        if (!isMobile) {
            restrictionRow.addEventListener('mouseenter', showRestriction);
            restrictionRow.addEventListener('mouseleave', hideRestriction);
        }
        
        // Mobile tap toggle
        restrictionRow.addEventListener('click', (e) => {
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                if (mediaPreview.classList.contains('active')) {
                    hideRestriction();
                } else {
                    // Hide other previews
                    const genderPreview = document.getElementById('gender-media-preview');
                    if (genderPreview) genderPreview.classList.remove('active');
                    if (flawPreview) flawPreview.classList.remove('active');
                    showRestriction();
                }
            }
        });
        
        // Close on click outside (mobile)
        if (isMobile) {
            document.addEventListener('click', (e) => {
                if (!restrictionRow.contains(e.target) && !mediaPreview.contains(e.target)) {
                    hideRestriction();
                }
            });
        }
    }
    
    // Gender media preview
    const genderRow = document.querySelector('.gender-row');
    const genderPreview = document.getElementById('gender-media-preview');
    const genderVideo = document.getElementById('gender-video');
    
    if (genderRow && genderPreview) {
        const showGender = () => {
            // Hide other previews first
            if (mediaPreview) mediaPreview.classList.remove('active');
            
            genderPreview.classList.add('active');
            
            // Start playing video
            if (genderVideo) {
                genderVideo.play().catch(e => console.log('Gender video play failed:', e));
            }
        };
        const hideGender = () => {
            genderPreview.classList.remove('active');
            
            // Pause video
            if (genderVideo) {
                genderVideo.pause();
            }
        };

        // Desktop hover
        if (!isMobile) {
            genderRow.addEventListener('mouseenter', showGender);
            genderRow.addEventListener('mouseleave', hideGender);
        }
        
        // Mobile tap toggle
        genderRow.addEventListener('click', (e) => {
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                if (genderPreview.classList.contains('active')) {
                    hideGender();
                } else {
                    // Hide other previews
                    if (mediaPreview) mediaPreview.classList.remove('active');
                    if (flawPreview) flawPreview.classList.remove('active');
                    showGender();
                }
            }
        });
        
        // Close on click outside (mobile)
        if (isMobile) {
            document.addEventListener('click', (e) => {
                if (!genderRow.contains(e.target) && !genderPreview.contains(e.target)) {
                    hideGender();
                }
            });
        }
    }

    // FLAW media preview
    const flawRow = document.querySelector('.flaw-row');
    if (flawRow && flawPreview) {
        const showFlaw = () => {
            if (mediaPreview) mediaPreview.classList.remove('active');
            const genderPreview = document.getElementById('gender-media-preview');
            if (genderPreview) genderPreview.classList.remove('active');
            flawPreview.classList.add('active');
        };
        const hideFlaw = () => {
            flawPreview.classList.remove('active');
        };

        if (!isMobile) {
            flawRow.addEventListener('mouseenter', showFlaw);
            flawRow.addEventListener('mouseleave', hideFlaw);
        }
        
        flawRow.addEventListener('click', (e) => {
            if (isMobile) {
                e.preventDefault();
                e.stopPropagation();
                if (flawPreview.classList.contains('active')) {
                    hideFlaw();
                } else {
                    // Hide other previews
                    if (mediaPreview) mediaPreview.classList.remove('active');
                    const genderPreview = document.getElementById('gender-media-preview');
                    if (genderPreview) genderPreview.classList.remove('active');
                    showFlaw();
                }
            }
        });
        
        // Close on click outside (mobile)
        if (isMobile) {
            document.addEventListener('click', (e) => {
                if (!flawRow.contains(e.target) && !flawPreview.contains(e.target)) {
                    hideFlaw();
                }
            });
        }
    }
}

// Music player functionality
function initializeMusicPlayer() {
    const genderBtn = document.getElementById('music-play-btn');
    const genderAudio = document.getElementById('gender-audio');
    const flawBtn = document.getElementById('flaw-play-btn');
    const flawAudio = document.getElementById('flaw-audio');
    const restrictionBtn = document.getElementById('restriction-play-btn');
    const restrictionAudio = document.getElementById('restriction-audio');
    const amazonBtn = document.getElementById('amazon-play-btn');
    const amazonAudio = document.getElementById('amazon-audio');

    function setup(btn, audio, otherBtn, otherAudio) {
        if (!btn || !audio) return;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Pause the other track if playing
            if (otherAudio && !otherAudio.paused) {
                otherAudio.pause();
                if (otherBtn) otherBtn.textContent = 'play';
            }
            if (audio.paused) {
                audio.play().then(() => {
                    btn.textContent = 'pause';
                }).catch(err => console.log('Audio play failed:', err));
            } else {
                audio.pause();
                btn.textContent = 'play';
            }
        });
        audio.addEventListener('ended', function() {
            btn.textContent = 'play';
        });
    }

    function pauseAllExcept(exceptAudio, exceptBtn) {
        const pairs = [
            [genderAudio, genderBtn],
            [flawAudio, flawBtn],
            [restrictionAudio, restrictionBtn],
            [amazonAudio, amazonBtn],
        ];
        pairs.forEach(([a, b]) => {
            if (!a) return;
            if (a !== exceptAudio && !a.paused) {
                a.pause();
                if (b) b.textContent = 'play';
            }
        });
    }

    function setup2(btn, audio) {
        if (!btn || !audio) return;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (audio.paused) {
                pauseAllExcept(audio, btn);
                audio.play().then(() => { btn.textContent = 'pause'; }).catch(err => console.log('Audio play failed:', err));
            } else {
                audio.pause();
                btn.textContent = 'play';
            }
        });
        audio.addEventListener('ended', function() { btn.textContent = 'play'; });
    }

    setup2(genderBtn, genderAudio);
    setup2(flawBtn, flawAudio);
    setup2(restrictionBtn, restrictionAudio);
    setup2(amazonBtn, amazonAudio);
}

// Update Three.js renderer clear color based on theme
function updateThreeJSBackground(isDark) {
    if (renderer) {
        renderer.setClearColor(isDark ? 0x4a4a4a : 0xffffff, 1); // Use lighter grey for consistency
    }
}

// Theme toggle
function initializeThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    // Restore previous theme
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        root.classList.add('dark');
        if (toggleBtn) toggleBtn.textContent = 'light';
        updateThreeJSBackground(true);
    } else {
        root.classList.remove('dark');
        if (toggleBtn) toggleBtn.textContent = 'dark';
        updateThreeJSBackground(false);
    }
    // Click handler
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isDark = root.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggleBtn.textContent = isDark ? 'light' : 'dark';
            updateThreeJSBackground(isDark);
        });
    }
}

// Random images functionality for landing page
function initializeRandomImages() {
    const imageArray = [
        'assets/randomimage/atlas.jpg',
        'assets/randomimage/Cave.jpg',
        'assets/randomimage/door.jpg',
        'assets/randomimage/horse.jpg',
        'assets/randomimage/PEDELI.jpg',
        'assets/randomimage/pub.jpg',
        'assets/randomimage/tree.jpg'
    ];
    
    const leftContainer = document.getElementById('random-image-left');
    const rightContainer = document.getElementById('random-image-right');
    
    if (!leftContainer || !rightContainer) return;
    
    let leftExpanded = false;
    let rightExpanded = false;
    let currentLeftImage = null;
    let currentRightImage = null;
    
    function getRandomImages() {
        const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
        return [shuffled[0], shuffled[1]];
    }
    
    function loadImages() {
        const [leftImagePath, rightImagePath] = getRandomImages();
        
        // Clear existing images
        leftContainer.innerHTML = '';
        rightContainer.innerHTML = '';
        
        // Create and add left image
        const leftImg = document.createElement('img');
        leftImg.src = leftImagePath;
        leftImg.alt = 'Random image';
        leftContainer.appendChild(leftImg);
        currentLeftImage = leftImagePath;
        
        // Create and add right image
        const rightImg = document.createElement('img');
        rightImg.src = rightImagePath;
        rightImg.alt = 'Random image';
        rightContainer.appendChild(rightImg);
        currentRightImage = rightImagePath;
        
        // Reset expanded states
        leftExpanded = false;
        rightExpanded = false;
        leftContainer.classList.remove('expanded');
        rightContainer.classList.remove('expanded');
    }
    
    // Handle left image click
    leftContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;
        
        if (leftExpanded) {
            // Collapse left
            leftExpanded = false;
            leftContainer.classList.remove('expanded');
        } else {
            // Expand left, collapse right if expanded
            leftExpanded = true;
            leftContainer.classList.add('expanded');
            if (rightExpanded) {
                rightExpanded = false;
                rightContainer.classList.remove('expanded');
            }
        }
    });
    
    // Handle right image click
    rightContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;
        
        if (rightExpanded) {
            // Collapse right
            rightExpanded = false;
            rightContainer.classList.remove('expanded');
        } else {
            // Expand right, collapse left if expanded
            rightExpanded = true;
            rightContainer.classList.add('expanded');
            if (leftExpanded) {
                leftExpanded = false;
                leftContainer.classList.remove('expanded');
            }
        }
    });
    
    // Load initial images
    loadImages();
    
    // Expose loadImages function for external use (e.g., when page rerenders)
    window.reloadRandomImages = loadImages;
}
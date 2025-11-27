'use client';

import { useEffect } from 'react';
import { createEventListenerManager } from '../utils/eventListeners';

export default function RandomImages() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { registerListener, registerCleanup, cleanup } = createEventListenerManager();

    const imageArray = [
      '/assets/randomimage/atlas.jpg',
      '/assets/randomimage/Cave.jpg',
      '/assets/randomimage/door.jpg',
      '/assets/randomimage/horse.jpg',
      '/assets/randomimage/PEDELI.jpg',
      '/assets/randomimage/pub.jpg',
      '/assets/randomimage/tree.jpg'
    ];

    const leftContainer = document.getElementById('random-image-left');
    const rightContainer = document.getElementById('random-image-right');

    if (!leftContainer || !rightContainer) return;

    let leftExpanded = false;
    let rightExpanded = false;

    function getRandomImages() {
      const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
      return [shuffled[0], shuffled[1]];
    }

    function loadImages() {
      const [leftImagePath, rightImagePath] = getRandomImages();

      leftContainer.innerHTML = '';
      rightContainer.innerHTML = '';

      const leftImg = document.createElement('img');
      leftImg.src = leftImagePath;
      leftImg.alt = 'Random image';
      leftContainer.appendChild(leftImg);

      const rightImg = document.createElement('img');
      rightImg.src = rightImagePath;
      rightImg.alt = 'Random image';
      rightContainer.appendChild(rightImg);

      leftExpanded = false;
      rightExpanded = false;
      leftContainer.classList.remove('expanded');
      rightContainer.classList.remove('expanded');
      leftContainer.style.left = '';
      leftContainer.style.right = '';
      rightContainer.style.right = '';
      rightContainer.style.left = '';
    }

    const handleLeftClick = (e) => {
      e.stopPropagation();
      if (leftExpanded) {
        leftExpanded = false;
        leftContainer.classList.remove('expanded');
        leftContainer.style.left = '';
        leftContainer.style.right = '';
      } else {
        leftExpanded = true;
        leftContainer.style.left = '0';
        leftContainer.style.right = 'auto';
        leftContainer.classList.add('expanded');
        if (rightExpanded) {
          rightExpanded = false;
          rightContainer.classList.remove('expanded');
          rightContainer.style.right = '';
          rightContainer.style.left = '';
        }
      }
    };

    const handleRightClick = (e) => {
      e.stopPropagation();
      if (rightExpanded) {
        rightExpanded = false;
        rightContainer.classList.remove('expanded');
        rightContainer.style.right = '';
        rightContainer.style.left = '';
      } else {
        rightExpanded = true;
        rightContainer.style.right = '0';
        rightContainer.style.left = 'auto';
        rightContainer.classList.add('expanded');
        if (leftExpanded) {
          leftExpanded = false;
          leftContainer.classList.remove('expanded');
          leftContainer.style.left = '';
          leftContainer.style.right = '';
        }
      }
    };

    registerListener(leftContainer, 'click', handleLeftClick);
    registerListener(rightContainer, 'click', handleRightClick);

    const handleResize = () => {
      if (leftExpanded && leftContainer.classList.contains('expanded')) {
        leftContainer.style.left = '0';
        leftContainer.style.right = 'auto';
      }

      if (rightExpanded && rightContainer.classList.contains('expanded')) {
        rightContainer.style.right = '0';
        rightContainer.style.left = 'auto';
      }
    };
    registerListener(window, 'resize', handleResize);

    loadImages();
    window.reloadRandomImages = loadImages;

    registerCleanup(() => {
      leftContainer.innerHTML = '';
      rightContainer.innerHTML = '';
      delete window.reloadRandomImages;
    });

    return cleanup;
  }, []);

  return (
    <>
      <div className="random-image-container random-image-left" id="random-image-left">
        <img src="/assets/randomimage/atlas.jpg" alt="Random image" />
      </div>
      <div className="random-image-container random-image-right" id="random-image-right">
        <img src="/assets/randomimage/Cave.jpg" alt="Random image" />
      </div>
    </>
  );
}





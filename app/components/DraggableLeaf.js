'use client';

import { useState, useRef, useEffect } from 'react';

export default function DraggableLeaf() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const leafRef = useRef(null);

  // Set random initial position on mount (desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      const maxX = window.innerWidth - 100; // Account for leaf width
      const maxY = window.innerHeight - 100; // Account for leaf height
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      setPosition({ x: randomX, y: randomY });
    }
  }, []);

  const handleMouseDown = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) return; // Only on desktop
    
    setIsDragging(true);
    const rect = leafRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={leafRef}
      className="draggable-leaf"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <img src="/assets/leaf.png" alt="Leaf" />
    </div>
  );
}


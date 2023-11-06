import React, { useState, useEffect } from 'react';

const useDrag = (ref: React.RefObject<HTMLDivElement>, callback: (x: number, y: number) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: MouseEvent) => {
    if (isDragging) {
      callback(e.movementX, e.movementY);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('pointerdown', handlePointerDown);
      element.addEventListener('pointerup', handlePointerUp);
      element.addEventListener('pointerleave', handlePointerUp);
      element.addEventListener('mousemove', handlePointerMove);

      return () => {
        element.removeEventListener('pointerdown', handlePointerDown);
        element.removeEventListener('pointerup', handlePointerUp);
        element.removeEventListener('pointerleave', handlePointerUp);
        element.removeEventListener('mousemove', handlePointerMove);
      };
    }
  }, [ref, isDragging, callback]);

  return isDragging;
};

export default useDrag;

import { useEffect, useRef } from 'react';

export const useSwipeDetection = (onSwipe) => {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const onTouchStart = (e) => {
      touchEnd.current = null;
      touchStart.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
    };

    const onTouchMove = (e) => {
      touchEnd.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
    };

    const onTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;

      const distanceX = touchStart.current.x - touchEnd.current.x;
      const distanceY = touchStart.current.y - touchEnd.current.y;
      const isLeftSwipe = distanceX > minSwipeDistance;
      const isRightSwipe = distanceX < -minSwipeDistance;
      const isUpSwipe = distanceY > minSwipeDistance;
      const isDownSwipe = distanceY < -minSwipeDistance;

      let direction = null;
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (isLeftSwipe) direction = 'left';
        if (isRightSwipe) direction = 'right';
      } else {
        if (isUpSwipe) direction = 'up';
        if (isDownSwipe) direction = 'down';
      }

      if (direction && onSwipe) {
        onSwipe(direction);
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [onSwipe]);
};

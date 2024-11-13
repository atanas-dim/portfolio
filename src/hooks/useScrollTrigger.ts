import { MutableRefObject, useEffect, useState } from 'react';

const useScrollTrigger = (
  triggerRef: MutableRefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      if (!triggerRef.current) return;

      const isVisible =
        window.scrollY + window.innerHeight >= triggerRef.current.offsetTop &&
        window.scrollY <
          triggerRef.current.offsetTop + triggerRef.current.offsetHeight;

      const progress =
        (window.scrollY +
          window.innerHeight / 2 -
          triggerRef.current.offsetTop) /
        triggerRef.current.offsetHeight;

      setIsVisible(isVisible);

      onProgress?.(progress);
    };

    calculateProgress();

    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('orientationchange', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('orientationchange', calculateProgress);
    };
  }, [onProgress, triggerRef]);

  return isVisible;
};

export default useScrollTrigger;

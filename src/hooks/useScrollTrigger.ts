import gsap from 'gsap';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

const useScrollTrigger = (
  triggerRef: MutableRefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void,
  ease?: string
) => {
  const [isVisible, setIsVisible] = useState(false);
  const progressValue = useRef(0);

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

      gsap.to(progressValue, {
        current: progress,
        onUpdate: () => {
          onProgress?.(progressValue.current);
        },
        duration: 1,
        ease: ease || 'back.out(4)',
      });
    };

    calculateProgress();

    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('orientationchange', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('orientationchange', calculateProgress);
    };
  }, [onProgress, triggerRef, ease]);

  return isVisible;
};

export default useScrollTrigger;

import gsap from 'gsap';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

// TODO Update this to use object for options
const useScrollTrigger = (
  triggerRef: MutableRefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void,
  easeOvershoot?: number,
  durationValue?: number
) => {
  const [isVisible, setIsVisible] = useState(false);
  const progressValue = useRef(0);
  const tween = useRef<gsap.core.Tween>();
  const lastScrollY = useRef(0);

  //TODO Review speed logic and use debounced value if possible
  useEffect(() => {
    const calculateProgress = () => {
      if (!triggerRef.current) return;

      const currentScrollY = window.scrollY;

      // Calculate scroll speed (pixels per millisecond)
      const scrollDistance = Math.abs(currentScrollY - lastScrollY.current);

      // Update last scroll position and timestamp for next calculation
      gsap.delayedCall(0.025, () => (lastScrollY.current = currentScrollY));

      const isVisible =
        currentScrollY + window.innerHeight >= triggerRef.current.offsetTop &&
        currentScrollY <
          triggerRef.current.offsetTop + triggerRef.current.offsetHeight;

      const progress =
        (currentScrollY +
          window.innerHeight / 2 -
          triggerRef.current.offsetTop) /
        triggerRef.current.offsetHeight;

      setIsVisible(isVisible);

      if (tween.current) tween.current.kill();

      const ease =
        scrollDistance > window.innerHeight / 3
          ? 'none'
          : `back.out(${easeOvershoot || 4})`;
      const duration =
        scrollDistance > window.innerHeight / 3 ? 0 : durationValue || 2.5;

      if (easeOvershoot === 6) console.log({ ease, duration });

      tween.current = gsap.to(progressValue, {
        current: progress,
        onUpdate: () => {
          // if (easeOvershoot === 6) console.log(` ${easeOvershoot}, ${ease}`);
          onProgress?.(progressValue.current);
        },
        duration,
        ease,
      });
    };

    calculateProgress();

    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('orientationchange', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('orientationchange', calculateProgress);
    };
  }, [onProgress, triggerRef, easeOvershoot, durationValue]);

  return isVisible;
};

export default useScrollTrigger;

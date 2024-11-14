import gsap from 'gsap';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

// TODO Update this to use object for options
const useScrollTrigger = (
  triggerRef: MutableRefObject<HTMLElement | null>,
  onProgress?: (progress: number, speed: number) => void,
  easeOvershoot?: number,
  duration?: number
) => {
  const [isVisible, setIsVisible] = useState(false);
  const progressValue = useRef(0);
  const tween = useRef<gsap.core.Tween>();
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  //TODO Review speed logic and use debounced value if possible
  useEffect(() => {
    const calculateProgress = () => {
      if (!triggerRef.current) return;

      const currentScrollY = window.scrollY;
      const currentTime = Date.now();

      // Calculate scroll speed (pixels per millisecond)
      const scrollDistance = Math.abs(currentScrollY - lastScrollY.current);
      const timeElapsed = currentTime - lastTimestamp.current;
      const scrollSpeed = timeElapsed > 0 ? scrollDistance / timeElapsed : 0;

      // Update last scroll position and timestamp for next calculation
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;

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

      tween.current = gsap.to(progressValue, {
        current: progress,
        onUpdate: () => {
          // if (easeOvershoot === 4)
          //   console.log(
          //     `Speed: ${scrollSpeed}, ${easeOvershoot}, ${
          //       (easeOvershoot || 0) / Math.max(1, scrollSpeed * 15)
          //     }`
          //   );
          onProgress?.(progressValue.current, scrollSpeed);
        },
        duration: scrollSpeed > 1.5 ? 0.3 : duration || 2.5,
        ease: easeOvershoot
          ? `back.out(${easeOvershoot / Math.max(1, scrollSpeed * 15)})`
          : 'back.out(4)',
      });
    };

    calculateProgress();

    window.addEventListener('scroll', calculateProgress);
    window.addEventListener('orientationchange', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('orientationchange', calculateProgress);
    };
  }, [onProgress, triggerRef, easeOvershoot]);

  return isVisible;
};

export default useScrollTrigger;

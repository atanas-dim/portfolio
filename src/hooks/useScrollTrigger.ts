import { MutableRefObject, useEffect, useState } from "react";

const useScrollTrigger = (
  triggerRef: MutableRefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void
) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      if (!triggerRef.current) return;
      const isActive =
        triggerRef.current?.offsetTop <= window.scrollY &&
        window.scrollY <
          triggerRef.current.offsetTop + triggerRef.current.offsetHeight;

      setIsActive(isActive);

      const progress =
        (window.scrollY - triggerRef.current.offsetTop) /
        triggerRef.current.offsetHeight;

      onProgress?.(progress);
    };

    calculateProgress();

    window.addEventListener("scroll", calculateProgress);
    window.addEventListener("orientationchange", calculateProgress);

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("orientationchange", calculateProgress);
    };
  }, [onProgress, triggerRef]);

  return isActive;
};

export default useScrollTrigger;

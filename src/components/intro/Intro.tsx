import { useGSAP } from '@gsap/react';
import { useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import { type FC, useRef } from 'react';
import { MdOutlineSwipeVertical } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

import useScrollTrigger from '@/hooks/useScrollTrigger';
import { SM_BREAKPOINT } from '@/resources/breakpoints';
import { SOCIAL_LINKS } from '@/resources/socialLinks';

const Intro: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | undefined>(undefined);
  const { width } = useViewportSize();

  useGSAP(() => {
    const els = gsap.utils.selector(containerRef.current)('h1, h2, a');

    const createTimeline = () => {
      gsap.set(els, { opacity: 1, y: 0 });

      timelineRef.current = gsap
        .timeline({
          paused: true,
        })
        .to(els, {
          opacity: 0,
          y: -16,
          stagger: 0.2,
        })
        .to(
          '#swipe-indicator',
          {
            y: 80,
            duration: 2,
          },
          0
        );
    };

    createTimeline();
  }, []);

  const { contextSafe } = useGSAP();

  const onScrollTriggerProgress = contextSafe((progress: number) => {
    const mappedProgress = gsap.utils.mapRange(0.5, 1.5, 0, 1, progress);
    timelineRef.current?.progress(mappedProgress);
  });

  const isVisible = useScrollTrigger(
    containerRef,
    onScrollTriggerProgress,
    width < SM_BREAKPOINT ? 20 : 8
  );

  return (
    <section id="intro" ref={containerRef} className="w-full h-screen">
      <div
        id="intro-content"
        className={twMerge(
          'w-full h-screen flex justify-center items-center flex-col p-8 pointer-events-none',
          isVisible && 'fixed top-0 left-0'
        )}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl  font-extrabold md:mb-2">
          Atanas Dimitrov
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-4">
          React Developer
        </h2>
        <div className="flex justify-center gap-2 *:pointer-events-auto">
          {SOCIAL_LINKS.map((link, index) => {
            return (
              <a
                key={'link-' + index}
                className="w-12 h-12 flex justify-center items-center"
                target="_blank"
                rel="noreferrer"
                href={link.href}
              >
                {link.icon}
              </a>
            );
          })}
        </div>
      </div>
      <div
        id="swipe-indicator"
        className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <MdOutlineSwipeVertical size="32" className="animate-bounce" />
      </div>
    </section>
  );
};

export default Intro;

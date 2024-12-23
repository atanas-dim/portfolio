'use client';

import { useGSAP } from '@gsap/react';
import { useViewportSize } from '@mantine/hooks';
import gsap from 'gsap';
import React, { type FC, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import useScrollTrigger from '@/hooks/useScrollTrigger';
import { SM_BREAKPOINT } from '@/resources/breakpoints';
import { ADDITIONAL_TOOLS, BASE_TOOLS, MAIN_TOOLS } from '@/resources/tools';

type Props = {};

const Tools: FC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | undefined>(undefined);
  const { width } = useViewportSize();

  useGSAP(() => {
    const createTimeline = () => {
      gsap.set('.tool', { filter: 'brightness(0)', y: 12, opacity: 0 });

      timelineRef.current = gsap
        .timeline({
          paused: true,
        })
        .addLabel('entry')
        .to(
          '.tool',
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
          },
          'entry'
        )

        .addLabel('brightess-anim')
        .to(
          '.tool',
          {
            filter: 'brightness(1)',
            stagger: -0.1,
          },
          'brightess-anim'
        )
        .to(
          '.tool',
          {
            filter: 'brightness(0)',
            stagger: -0.1,
          },
          'brightess-anim+=0.5'
        )
        .addLabel('exit')

        .to(
          '.tool',
          {
            y: -12,
            opacity: 0,
            stagger: -0.05,
          },
          'exit'
        );
    };

    createTimeline();
  }, []);

  const { contextSafe } = useGSAP();

  const onScrollTriggerProgress = contextSafe((progress: number) => {
    timelineRef.current?.progress(Math.min(1, Math.max(0, progress)));
  });

  const isVisible = useScrollTrigger(
    containerRef,
    onScrollTriggerProgress,
    width < SM_BREAKPOINT ? 20 : 10
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-[150vh] -mt-[50vh] mb-[10vh] pointer-events-none"
    >
      <div
        id="tools"
        className={twMerge(
          '-scroll-m-[50vh] w-full max-w-2xl  h-screen p-8 flex flex-col justify-center gap-3 font-extrabold',
          isVisible && 'fixed top-0 left-1/2 -translate-x-1/2'
        )}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {BASE_TOOLS.map((tool, index) => {
            return (
              <span
                key={'tool-' + index}
                className="tool text-xl sm:text-2xl brightness-0 opacity-0 flex items-center"
                style={{ color: tool.color }}
              >
                {tool.label}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 md:gap-y-4">
          {MAIN_TOOLS.map((tool, index) => {
            return (
              <span
                key={'tool-' + index}
                className="tool text-2xl sm:text-3xl lg:text-4xl brightness-0 opacity-0 flex items-center"
                style={{ color: tool.color }}
              >
                {tool.label}
              </span>
            );
          })}
          {ADDITIONAL_TOOLS.map((tool, index) => {
            return (
              <span
                key={'tool-' + index}
                className="tool text-xl sm:text-2xl brightness-0 opacity-0 flex items-center"
                style={{ color: tool.color }}
              >
                {tool.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tools;

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { type FC, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import useScrollTrigger from "@/hooks/useScrollTrigger";
import { ADDITIONAL_TOOLS, BASE_TOOLS, MAIN_TOOLS } from "@/resources/tools";

type Props = {};

const Tools: FC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | undefined>(undefined);

  useGSAP(() => {
    const createTimeline = () => {
      gsap.set(".tool", { filter: "brightness(0)", y: 16, opacity: 0 });
      gsap.set("#tools", { y: 40 });

      timelineRef.current = gsap
        .timeline({
          paused: true,
        })
        .addLabel("entry")
        .to(
          ".tool",
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
          },
          "entry"
        )
        .to(
          "#tools",
          {
            y: 0,
            duration: 2,
          },
          "entry"
        )
        .addLabel("brightess-anim")
        .to(
          ".tool",
          {
            filter: "brightness(1)",
            stagger: -0.1,
          },
          "brightess-anim"
        )
        .to(
          ".tool",
          {
            filter: "brightness(0)",
            stagger: -0.1,
          },
          "brightess-anim+=0.5"
        )
        .addLabel("exit")
        .to(
          "#tools",
          {
            y: -40,
            duration: 2,
          },
          "exit"
        )
        .to(
          ".tool",
          {
            y: -16,
            opacity: 0,
            stagger: -0.05,
          },
          "exit"
        );
    };

    createTimeline();
  }, []);

  const { contextSafe } = useGSAP();

  const onScrollTriggerProgress = contextSafe((progress: number) => {
    timelineRef.current?.progress(Math.min(1, Math.max(0, progress)));
  });

  const isVisible = useScrollTrigger(containerRef, onScrollTriggerProgress);

  return (
    <section
      ref={containerRef}
      className="w-full h-[150svh] -mt-[50svh] pointer-events-none"
    >
      <div
        id="tools"
        className={twMerge(
          "-scroll-m-[50svh] w-full max-w-3xl  h-svh p-8 flex flex-col justify-center gap-3 font-bold lowercase",
          isVisible && "fixed top-0 left-1/2 !-translate-x-1/2"
        )}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {BASE_TOOLS.map((tool, index) => {
            return (
              <span
                key={"tool-" + index}
                className="tool text-xl md:text-4xl brightness-0 opacity-0"
                style={{ color: tool.color }}
              >
                {tool.label}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-3">
          {MAIN_TOOLS.map((tool, index) => {
            return (
              <span
                key={"tool-" + index}
                className="tool text-3xl lg:text-5xl brightness-0 opacity-0"
                style={{ color: tool.color }}
              >
                {tool.label}
              </span>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {ADDITIONAL_TOOLS.map((tool, index) => {
            return (
              <span
                key={"tool-" + index}
                className="tool text-lg md:text-2xl brightness-0 opacity-0"
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

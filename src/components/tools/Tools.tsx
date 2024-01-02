"use client";
import { ADDITIONAL_TOOLS, BASE_TOOLS, MAIN_TOOLS } from "@/resources/tools";
import gsap from "gsap";
import React, { useEffect, type FC, useRef } from "react";

type Props = {
  isActiveSection: boolean;
};

const Tools: FC<Props> = ({ isActiveSection }) => {
  const timeline = useRef<GSAPTimeline>();

  useEffect(() => {
    if (!isActiveSection) {
      timeline.current?.kill();
      gsap.to(".tool", {
        filter: "brightness(0)",
        duration: 0.4,
      });
    } else
      timeline.current = gsap
        .timeline({ delay: 1, repeat: -1, repeatDelay: 2 })
        .to(".tool", {
          filter: "brightness(1)",
          stagger: 0.1,
          duration: 0.8,
        })
        .to(
          ".tool",
          {
            filter: "brightness(0)",
            stagger: 0.05,
            duration: 0.4,
          },
          1.75
        );
  }, [isActiveSection]);

  return (
    <div className="w-full h-full justify-center p-8 flex flex-col gap-3 font-bold lowercase">
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {BASE_TOOLS.map((tool, index) => {
          return (
            <span
              key={"tool-" + index}
              className="tool text-xl md:text-4xl brightness-0"
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
              className="tool text-3xl md:text-5xl brightness-0"
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
              className="tool text-lg md:text-2xl brightness-0"
              style={{ color: tool.color }}
            >
              {tool.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Tools;

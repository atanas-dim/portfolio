"use client";
import { ADDITIONAL_TOOLS, BASE_TOOLS, MAIN_TOOLS } from "@/resources/tools";
import gsap from "gsap";
import React, { useEffect, type FC } from "react";

const Tools: FC = () => {
  useEffect(() => {
    gsap
      .timeline({ repeat: -1, repeatDelay: 2 })
      .set(".tool", {
        filter: "brightness(0)",
      })
      .to(".tool", {
        filter: "brightness(1)",
        stagger: 0.1,
        duration: 0.8,
      })
      .to(
        ".tool",
        {
          filter: "brightness(0)",
          stagger: 0.1,
          duration: 0.8,
        },
        2
      );
  }, []);

  return (
    <div className="w-full h-full justify-center p-8 flex flex-col gap-3 font-bold lowercase">
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {BASE_TOOLS.map((tool, index) => {
          return (
            <span
              key={"tool-" + index}
              className="tool text-xl md:text-4xl"
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
              className="tool text-3xl md:text-5xl"
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
              className="tool text-lg md:text-2xl"
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

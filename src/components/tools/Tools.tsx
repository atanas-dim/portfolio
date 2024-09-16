"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { type FC, useRef } from "react";

import { ADDITIONAL_TOOLS, BASE_TOOLS, MAIN_TOOLS } from "@/resources/tools";

type Props = {};

const Tools: FC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".tool", { filter: "brightness(0)", y: 16, opacity: 0 });

    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          preventOverlaps: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.set("#tools-wrapper", {
              position: "fixed",
            });
          },
          onEnterBack: () => {
            gsap.set("#tools-wrapper", {
              position: "fixed",
            });
          },
          onLeave: () => {
            gsap.set("#tools-wrapper", {
              position: "static",
            });
          },
          onLeaveBack: () => {
            gsap.set("#tools-wrapper", {
              position: "static",
            });
          },
        },
      })
      .to(".tool", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      })
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
        " #tools-wrapper",
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

    const onResize = () => {
      timeline.scrollTrigger?.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <section ref={containerRef} id="tools" className="w-full h-[150svh]">
      <div
        id="tools-wrapper"
        className="fixed top-0 left-0 w-full h-[100svh] p-8 flex flex-col justify-center gap-3 font-bold lowercase"
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
                className="tool text-3xl md:text-5xl brightness-0 opacity-0"
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

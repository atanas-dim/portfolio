import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { SOCIAL_LINKS } from "@/resources/socialLinks";

const Intro: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useGSAP(() => {
    let timeline: gsap.core.Timeline | undefined = undefined;

    const els = gsap.utils.selector(containerRef.current)("h1, h2, a");

    const createTimeline = () => {
      timeline?.scrollTrigger?.kill();

      const scroller = document.getElementsByTagName("main")?.[0];
      if (!scroller) return;

      timeline = gsap
        .timeline({
          scrollTrigger: {
            scroller,
            trigger: containerRef.current,
            start: "top top",
            end: "bottom center",
            scrub: 2,
            preventOverlaps: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onRefresh: () => {
              scroller.scrollTo(0, window.scrollY + 1);
            },
            onUpdate: (scrollTrigger) => {
              setIsActive(scrollTrigger.isActive || window.scrollY <= 0);
            },
          },
        })
        .to(els, {
          opacity: 0,
          y: -16,
          stagger: 0.2,
        });
    };

    createTimeline();

    window.addEventListener("orientationchange", createTimeline);
    window.addEventListener("resize", createTimeline);

    return () => {
      window.removeEventListener("orientationchange", createTimeline);
      window.removeEventListener("resize", createTimeline);
    };
  }, []);

  return (
    <section id="intro" ref={containerRef} className="w-full h-svh">
      <div
        id="intro-content"
        className={twMerge(
          "w-full h-svh flex justify-center items-center flex-col p-8",
          isActive && "fixed top-0 left-0"
        )}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold md:mb-2">
          atanas dimitrov
        </h1>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 md:mb-4">
          react developer
        </h2>
        <div className="flex justify-center gap-2">
          {SOCIAL_LINKS.map((link, index) => {
            return (
              <a
                key={"link-" + index}
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
    </section>
  );
};

export default Intro;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";

import { ProjectData, PROJECTS } from "@/resources/projects";
import {
  adjustColorLightness,
  interpolateColor,
  MAX_LIGHTNESS,
} from "@/utils/colors";

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const timeline = useRef<GSAPTimeline>();

  useGSAP(
    () => {
      const themeColorMetaTag = document.querySelector(
        'meta[name="theme-color"]'
      );

      const setColors = (progress: number) => {
        const colorStops = [
          "#ffffff",
          adjustColorLightness("#D70321", MAX_LIGHTNESS),
          "#ffffff",
          adjustColorLightness("#349649", MAX_LIGHTNESS),
          "#ffffff",
          adjustColorLightness("#0000BD", MAX_LIGHTNESS),
          "#ffffff",
        ];

        const themeColor = interpolateColor(colorStops, progress);

        document.body.style.backgroundColor = themeColor;
        themeColorMetaTag?.setAttribute("content", themeColor);

        const menuItemColorStops = colorStops.map((color) =>
          color === "#ffffff" ? "#fff8cf" : color
        );
        const menuItemColor = interpolateColor(menuItemColorStops, progress);

        gsap.set(".menu-backdrop", {
          backgroundColor: themeColor,
        });
        gsap.set(".menu-item-bg", {
          backgroundColor: (i) => (i === 0 ? themeColor : menuItemColor),
        });
      };

      if (!timeline.current || timeline.current.progress() <= 0) setColors(0);

      timeline.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setColors(progress);
          },
          onEnter: () => setColors(0),
          onEnterBack: () => setColors(1),
          onLeave: () => setColors(1),
          onLeaveBack: () => setColors(0),
        },
      });
    },
    { dependencies: [] }
  );

  return (
    // PY needed to make the colours show in full when each projects is exactly in the middle of the screen
    <section ref={containerRef} className="w-full flex flex-col py-[50vh]">
      <div id="projects" className="w-full flex flex-col">
        {PROJECTS.map((project, index) => {
          return <Project key={`project-container-${index}`} {...project} />;
        })}
      </div>
    </section>
  );
};

export default Projects;

type ProjectProps = ProjectData;

const Project: FC<ProjectProps> = ({ title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            scrub: true,
          },
        })
        .to(contentRef.current, {
          x: -100 + "%",
          ease: "none",
        });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full h-screen shrink-0">
      <div
        ref={contentRef}
        className="w-full h-screen fixed inset-0"
        style={{ transform: `translateX(100%)` }}
      >
        <div className="w-full h-dvh flex items-center justify-center">
          <div className="aspect-[1178/2556] border border-black rounded-lg p-6">
            {title}
          </div>
          {/* <div>{title}</div>
          <div>{title}</div> */}
        </div>
      </div>
    </div>
  );
};

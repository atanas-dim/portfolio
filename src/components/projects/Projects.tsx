import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";

import { ProjectData, PROJECTS } from "@/resources/projects";
import { interpolateColor, setLightness } from "@/utils/colors";

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const themeColorMetaTag = document.querySelector(
        'meta[name="theme-color"]'
      );
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const color = interpolateColor(
              [
                "#ffffff",
                setLightness("#D70321", 90),
                "#ffffff",
                setLightness("#39884a", 90),
                "#ffffff",
                setLightness("#0000BD", 90),
                "#ffffff",
              ],
              progress
            );
            document.body.style.backgroundColor = color;
            themeColorMetaTag?.setAttribute("content", color);
          },
        },
      });
    },
    { scope: containerRef }
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
        <div className="w-full h-dvh flex flex-col justify-between">
          <div>{title}</div>
          <div>{title}</div>
        </div>
      </div>
    </div>
  );
};

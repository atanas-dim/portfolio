import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";

import { ProjectData, PROJECTS } from "@/resources/projects";
import { interpolateColor } from "@/utils/colors";

const Projects: FC = () => {
  useGSAP(() => {
    const themeColorMetaTag = document.querySelector(
      'meta[name="theme-color"]'
    );
    console.log({ themeColorMetaTag });
    gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "bottom 200vh",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          console.log({ progress });
          const color = interpolateColor(
            ["#ffffff", "#ff0000", "#00cd22", "#0800ff", "#ffffff"],
            progress
          );
          document.body.style.backgroundColor = color;
          themeColorMetaTag?.setAttribute("content", color);
        },
      },
    });
  }, []);

  return (
    <section id="projects" className="w-full flex flex-col">
      {PROJECTS.map((project, index) => {
        return <Project key={`project-container-${index}`} {...project} />;
      })}
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
        {title}
      </div>
    </div>
  );
};

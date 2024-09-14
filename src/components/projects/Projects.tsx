import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";

import { ProjectData, PROJECTS } from "@/resources/projects";

const COLOURS = ["rgb(255, 0, 0)", "rgb(0, 255, 26)", "rgb(35, 1, 255)"];

const Projects: FC = () => {
  return (
    <section id="projects" className="w-full flex flex-col">
      {PROJECTS.map((project, index) => {
        return (
          <Project
            key={`project-container-${index}`}
            index={index}
            {...project}
          />
        );
      })}
    </section>
  );
};

export default Projects;

type ProjectProps = ProjectData & {
  index: number;
};

const Project: FC<ProjectProps> = ({ title, index }) => {
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
    { scope: containerRef, dependencies: [index] }
  );

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        })
        .to(document.body, {
          backgroundColor: COLOURS[index],
        });
    },
    { scope: containerRef, dependencies: [index] }
  );

  return (
    <div ref={containerRef} className="w-full h-screen shrink-0">
      <div
        ref={contentRef}
        className="w-full h-screen fixed inset-0 border border-solid border-black"
        style={{ transform: `translateX(100%)` }}
      >
        {title}
      </div>
    </div>
  );
};

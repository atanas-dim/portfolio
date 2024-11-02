import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { type FC, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import useScrollTrigger from "@/hooks/useScrollTrigger";
import { ProjectDef, PROJECTS } from "@/resources/projects";

const MEDIA_WRAPPER_CLASSES = `media-wrapper will-change-transform sm:mr-auto bg-white relative p-[calc(0.02*var(--phone-height))] rounded-[calc(0.08*var(--phone-height))] size-fit border border-black`;
const MEDIA_CLASSES = `bg-black shadow-[0px_0px_0px_5px_#131313] aspect-[1178/2556] w-auto object-cover border border-black h-[var(--phone-height)] rounded-[calc(0.06*var(--phone-height))]`;
const SM_BREAKPOINT = 640;
const PARALLAX_OFFSET = 64;

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-full flex flex-col pb-[50vh]">
      <div id="projects" className="w-full flex flex-col">
        {PROJECTS.map((project, index) => {
          return <Project key={`project-container-${index}`} {...project} />;
        })}
      </div>
    </section>
  );
};

export default Projects;

const Project: FC<ProjectDef> = ({
  title,
  themeColor,
  videoSrc,
  image,
  technologies,
  links,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const [elsTimeline, setElsTimeline] = useState<
    gsap.core.Timeline | undefined
  >(undefined);

  useGSAP(() => {
    const createElsTimeline = () => {
      if (!contentRef.current) return;
      if (elsTimeline) elsTimeline.kill();

      const textEls = gsap.utils.selector(contentRef)("h2, p, .links");
      const mediaWrapper = gsap.utils.selector(contentRef)(" .media-wrapper");
      const glow = gsap.utils.selector(contentRef)(".glow");

      const els =
        window.innerWidth < SM_BREAKPOINT
          ? [mediaWrapper, textEls, glow]
          : [textEls, mediaWrapper, glow];

      gsap.set(els, {
        x: (i) => window.innerWidth * 1.75 + (i + 1) * PARALLAX_OFFSET,
      });

      const newTimeline = gsap
        .timeline({
          paused: true,
        })
        .to(els, {
          x: (i) => -(window.innerWidth * 1.75 + (i + 1) * PARALLAX_OFFSET),
          ease: "linear",
        });

      setElsTimeline(newTimeline);
    };

    createElsTimeline();

    window.addEventListener("resize", createElsTimeline);

    return () => {
      window.removeEventListener("resize", createElsTimeline);
    };
  }, []);

  const onScrollTriggerProgress = contextSafe((progress: number) => {
    if (elsTimeline) {
      const mappedProgress = gsap.utils.mapRange(-1, 2, 0, 1, progress);

      const timelineProgress = Math.min(1, Math.max(0, mappedProgress));
      elsTimeline.progress(timelineProgress);
    }
  });

  const isActive = useScrollTrigger(containerRef, onScrollTriggerProgress);

  return (
    <div ref={containerRef} className="w-full h-screen  max-h-[800px] shrink-0">
      <div
        ref={contentRef}
        className={twMerge(
          "w-full h-screen overflow-hidden",
          isActive && "fixed inset-0"
        )}
      >
        <div
          role="presentation"
          className="glow bg-[radial-gradient(80vmin_at_40%_100%,#ffd3e5_0%,#ffffff00_50%)] absolute inset-0 -z-10 pointer-events-none"
        />

        <div className="w-full h-screen flex items-center justify-center sm:gap-6 lg:gap-10 flex-col-reverse sm:flex-row">
          <div className="p-4 pb-10 sm:pb-4 w-full sm:w-3/5 h-full flex flex-col sm:justify-center items-center">
            <div className="sm:ml-auto flex flex-col justify-center items-center gap-1 md:gap-3 text-center">
              <h2 className="will-change-transform text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                {title}
              </h2>
              <p className="will-change-transform font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 whitespace-nowrap">
                {technologies}
              </p>
              <div className="links flex gap-4">
                {links.map((link, index) => {
                  return (
                    <a
                      key={title.split(" ").join("-") + "-link-" + index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="will-change-transform [&:nth-of-type(1)]:bg-rose-300 [&:nth-of-type(2)]:bg-yellow-300 rounded-xl px-3 py-1 hover:brightness-95 active:brightness-90 transition-all duration-200 ease-in-out"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-4 pt-12 sm:pt-4 w-full sm:w-2/5 h-full flex justify-center items-center">
            <div className={MEDIA_WRAPPER_CLASSES}>
              <Image
                src={image}
                alt=""
                className={twMerge(
                  MEDIA_CLASSES,
                  "flex justify-center items-center"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

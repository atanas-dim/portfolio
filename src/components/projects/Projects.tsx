import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useEffect, useRef, useState } from "react";

import { ProjectData, PROJECTS } from "@/resources/projects";
import {
  adjustColorLightness,
  interpolateColor,
  MAX_LIGHTNESS,
} from "@/utils/colors";

const PORTRAIT_HEIGHT = 70 + "vmax";
const LANDSCAPE_HEIGHT = 80 + "vmin";

const VIDEO_WRAPPER_CLASSES = `landscape:p-[calc(0.02*${LANDSCAPE_HEIGHT})] landscape:rounded-[calc(0.08*${LANDSCAPE_HEIGHT})] portrait:p-[calc(0.02*${PORTRAIT_HEIGHT})] portrait:rounded-[calc(0.08*${PORTRAIT_HEIGHT})] size-fit border border-black`;
const VIDEO_PLAYER_CLASSES = `aspect-[1178/2556] object-cover border border-black landscape:h-[${LANDSCAPE_HEIGHT}] landscape:rounded-[calc(0.06*${LANDSCAPE_HEIGHT})] portrait:h-[${PORTRAIT_HEIGHT}] portrait:rounded-[calc(0.06*${PORTRAIT_HEIGHT})]`;

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const timeline = useRef<GSAPTimeline>();

  useGSAP(
    () => {
      const themeColorMetaTag = document.querySelector(
        'meta[name="theme-color"]'
      );

      const setColors = (progress: number) => {
        const colorStops = PROJECTS.map((project, index) => {
          if (index === 0)
            return [
              "#ffffff",
              adjustColorLightness(project.themeColor, MAX_LIGHTNESS),
              "#ffffff",
            ];
          else
            return [
              adjustColorLightness(project.themeColor, MAX_LIGHTNESS),
              "#ffffff",
            ];
        }).flat();

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

const Project: FC<ProjectProps> = ({ title, themeColor, videoSrc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            scrub: true,
            onUpdate: (self) => {
              const video = videoRef.current;
              if (!video) return;

              const progress = self.progress;

              if (progress >= 0.35 && progress <= 0.65) {
                video.play();
              } else {
                video.pause();
              }
            },
          },
        })
        .to(contentRef.current, {
          x: -100 + "%",
          ease: "none",
        });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen shrink-0">
      <div
        ref={contentRef}
        className="w-full h-screen fixed inset-0"
        style={{
          transform: `translateX(100%)`,
        }}
      >
        <div className="w-full h-svh flex items-center justify-center ">
          <div className={VIDEO_WRAPPER_CLASSES}>
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                preload="auto"
                className={VIDEO_PLAYER_CLASSES}
              ></video>
            ) : (
              <div
                className={VIDEO_PLAYER_CLASSES}
                style={{
                  backgroundColor: themeColor,
                }}
              >
                {title}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

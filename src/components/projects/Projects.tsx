import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useEffect, useMemo, useRef, useState } from "react";

import useScrollTrigger from "@/hooks/useScrollTrigger";
import { ProjectData, PROJECTS } from "@/resources/projects";
import { adjustColorLightnessAndSaturation } from "@/utils/colors";
import { shiftHue } from "@/utils/hue";

const VIDEO_WRAPPER_CLASSES = `video-wrapper sm:mr-auto bg-white relative p-[calc(0.02*var(--phone-height))] rounded-[calc(0.08*var(--phone-height))] size-fit border border-black`;
const VIDEO_PLAYER_CLASSES = `bg-black shadow-[0px_0px_0px_5px_#131313] aspect-[1178/2556] object-cover border border-black h-[var(--phone-height)] rounded-[calc(0.06*var(--phone-height))]`;
const SM_BREAKPOINT = 640;
const PARALLAX_OFFSET = 16;

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

type ProjectProps = ProjectData;

const Project: FC<ProjectProps> = ({
  title,
  themeColor,
  videoSrc,
  technologies,
  links,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const adjustedColor = useMemo(
    () => adjustColorLightnessAndSaturation(themeColor, { lightness: 72 }),
    [themeColor]
  );
  const { contextSafe } = useGSAP();

  const [timeline, setTimeline] = useState<gsap.core.Timeline | undefined>(
    undefined
  );

  useGSAP(() => {
    const createTimeline = () => {
      if (!containerRef.current) return;
      if (timeline) timeline.kill();

      const textEls = gsap.utils.selector(containerRef)("h2, p, .links");
      const videoWrapper = gsap.utils.selector(containerRef)(" .video-wrapper");

      const els =
        window.innerWidth < SM_BREAKPOINT
          ? [videoWrapper, textEls]
          : [textEls, videoWrapper];

      gsap.set(els, {
        x: (i) => (i + 1) * PARALLAX_OFFSET + "em",
      });

      const newTimeline = gsap
        .timeline({
          paused: true,
        })
        .to(els, {
          x: (i) => -(i + 1) * PARALLAX_OFFSET + "em",
          ease: "linear",
        });

      setTimeline(newTimeline);
    };

    createTimeline();

    window.addEventListener("resize", createTimeline);

    return () => {
      window.removeEventListener("resize", createTimeline);
    };
  }, []);

  const onScrollTriggerProgress = contextSafe((progress: number) => {
    const shouldPlay = progress >= 0.35 && progress <= 0.65;

    if (videoRef.current) {
      if (shouldPlay) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    const interpolatedProgress = gsap.utils.interpolate(50, -50, progress);

    const x = Math.min(100, Math.max(-100, interpolatedProgress)) + "%";

    gsap.set(contentRef.current, {
      x,
    });

    if (timeline) {
      const mappedProgress = gsap.utils.mapRange(-3, 4, 0, 1, progress);

      const timelineProgress = Math.min(1, Math.max(0, mappedProgress));
      timeline.progress(timelineProgress);
    }
  });

  useScrollTrigger(containerRef, onScrollTriggerProgress);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", onEnded, false);

    video.load();

    return () => {
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useGSAP(() => {
    const selector = gsap.utils.selector(containerRef);
    const randomNegX = gsap.utils.random(-28, -16, 2, true);
    const randomPosX = gsap.utils.random(16, 28, 2, true);
    const randomNegY = gsap.utils.random(-16, -10, 2, true);
    const randomPosY = gsap.utils.random(16, 28, 2, true);
    const randomDuration = gsap.utils.random(5, 9, 0.5, true);

    const glowEls = selector(".glow");

    glowEls.forEach((el, index) => {
      gsap.set(el, {
        x: () => {
          if (index === 0) return randomNegX();
          if (index === 1) return randomPosX();
          if (index === 2) return randomPosX();
          return 0;
        },
        y: () => {
          if (index === 0) return randomNegY();
          if (index === 1) return randomPosY();
          if (index === 2) return randomNegY();
          return 0;
        },
      });

      gsap.to(el, {
        x: () => {
          if (index === 0) return randomPosX();
          if (index === 1) return randomNegX();
          if (index === 2) return randomNegX();
          return 0;
        },
        y: () => {
          if (index === 0) return randomPosY();
          if (index === 1) return randomNegY();
          if (index === 2) return randomPosY();
          return 0;
        },
        scaleX: 0.9,
        scaleY: 0.95,
        duration: () => randomDuration(),
        yoyo: true,
        repeat: -1,
        ease: "none",
      });
    });

    return () => {
      gsap.killTweensOf(selector(".glow"));
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen max-h-[800px] shrink-0">
      <div
        ref={contentRef}
        className="w-full h-screen fixed inset-0 z-10 translate-x-full bg-[radial-gradient(90vmin_at_40%_100%,#ffd3e5_0%,#ffffff00_50%)]"
      >
        <div className="w-full h-screen flex items-center justify-center sm:gap-6 lg:gap-10 flex-col-reverse sm:flex-row">
          <div className="p-4 pb-10 sm:pl-14 sm:pb-4 w-full sm:w-1/2 h-full flex flex-col sm:justify-center items-center">
            <div className="sm:ml-auto flex flex-col justify-center items-center gap-2 md:gap-3 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                {title}
              </h2>
              <p className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl sm:mb-1 whitespace-nowrap">
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
                      className="[&:nth-of-type(1)]:bg-rose-300 [&:nth-of-type(2)]:bg-yellow-300 rounded-xl px-3 py-1 hover:brightness-95 active:brightness-90 transition-all duration-200 ease-in-out"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-4 pt-12 sm:pr-14 sm:pt-4 w-full sm:w-1/2 h-full flex justify-center items-center">
            <div
              className={VIDEO_WRAPPER_CLASSES}
              style={{
                // @ts-expect-error
                "--shadow-color1": adjustedColor + "60",
                "--shadow-color2": shiftHue(adjustedColor, -25) + "60",
                "--shadow-color3": shiftHue(adjustedColor, -55) + "60",
              }}
            >
              <div
                role="presentation"
                className="glow absolute inset-0 -z-[1] blur-[20px] bg-[var(--shadow-color1)]"
              />
              <div
                role="presentation"
                className="glow absolute inset-0 -z-[2] blur-[20px] bg-[var(--shadow-color2)]"
              />
              <div
                role="presentation"
                className="glow absolute inset-0 -z-[3] blur-[20px] bg-[var(--shadow-color3)]"
              />

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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

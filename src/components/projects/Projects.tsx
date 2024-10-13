import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useEffect, useMemo, useRef, useState } from "react";

import useScrollTrigger from "@/hooks/useScrollTrigger";
import { ProjectData, PROJECTS } from "@/resources/projects";
import { adjustColorLightnessAndSaturation } from "@/utils/colors";
import { shiftHue } from "@/utils/hue";

const VIDEO_WRAPPER_CLASSES = `bg-white relative p-[calc(0.02*var(--phone-height))] rounded-[calc(0.08*var(--phone-height))] size-fit border border-black`;
const VIDEO_PLAYER_CLASSES = `bg-black shadow-[0px_0px_0px_5px_#131313] aspect-[1178/2556] object-cover border border-black h-[var(--phone-height)] rounded-[calc(0.06*var(--phone-height))]`;

const Projects: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
  const adjustedColor = useMemo(
    () => adjustColorLightnessAndSaturation(themeColor, { lightness: 72 }),
    [themeColor]
  );
  const { contextSafe } = useGSAP();

  const onScrollTriggerProgress = contextSafe((progress: number) => {
    const x =
      Math.min(100, Math.max(-100, gsap.utils.interpolate(0, -100, progress))) +
      "%";

    gsap.set(contentRef.current, {
      x,
    });
  });

  const isActive = useScrollTrigger(containerRef, onScrollTriggerProgress);

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
    const randomNegX = gsap.utils.random(-40, -16, 2, true);
    const randomPosX = gsap.utils.random(16, 40, 2, true);
    const randomNegY = gsap.utils.random(-30, -10, 2, true);
    const randomPosY = gsap.utils.random(16, 40, 2, true);
    const randomDuration = gsap.utils.random(5, 9, 0.5, true);

    gsap.set(selector(".glow"), {
      x: (i) => {
        if (i === 0) return randomNegX();
        if (i === 1) return randomPosX();
        if (i === 2) return randomPosX();
        return 0;
      },
      y: (i) => {
        if (i === 0) return randomNegY();
        if (i === 1) return randomPosY();
        if (i === 2) return randomNegY();
        return 0;
      },
    });

    gsap.to(selector(".glow"), {
      x: (i) => {
        if (i === 0) return randomPosX();
        if (i === 1) return randomNegX();
        if (i === 2) return randomNegX();
        return 0;
      },
      y: (i) => {
        if (i === 0) return randomPosY();
        if (i === 1) return randomNegY();
        if (i === 2) return randomPosY();
        return 0;
      },
      scaleX: 0.85,
      scaleY: 0.95,
      duration: () => randomDuration(),
      yoyo: true,
      repeat: -1,
      ease: "none",
    });

    return () => {
      gsap.killTweensOf(selector(".glow"));
    };
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full h-screen shrink-0">
      <div
        ref={contentRef}
        className="w-full h-svh fixed inset-0 z-10 translate-x-[100%]"
      >
        <div className="w-full h-svh flex items-center justify-center">
          <div
            className={VIDEO_WRAPPER_CLASSES}
            style={{
              // @ts-expect-error
              "--shadow-color1": adjustedColor + "60",
              "--shadow-color2": shiftHue(adjustedColor, 25) + "60",
              "--shadow-color3": shiftHue(adjustedColor, 75) + "60",
            }}
          >
            <div
              role="presentation"
              className="glow absolute inset-0 -z-[3] blur-xl bg-[var(--shadow-color1)]"
            />
            <div
              role="presentation"
              className="glow absolute inset-0 -z-[3] blur-xl bg-[var(--shadow-color2)]"
            />
            <div
              role="presentation"
              className="glow absolute inset-0 -z-[3] blur-xl bg-[var(--shadow-color3)]"
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

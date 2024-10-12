import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useEffect, useMemo, useRef, useState } from "react";

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
  const [isActive, setIsActive] = useState(false);

  useGSAP(
    () => {
      let timeline: gsap.core.Timeline | undefined = undefined;

      const createTimeline = () => {
        timeline?.scrollTrigger?.kill();

        const scroller = document.getElementsByTagName("main")?.[0];
        if (!scroller) return;

        timeline = gsap
          .timeline({
            scrollTrigger: {
              scroller,
              trigger: containerRef.current,
              start: "top bottom",
              scrub: true,
              preventOverlaps: true,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
              onUpdate: (scrollTrigger) => {
                setIsActive(scrollTrigger.isActive);

                const video = videoRef.current;
                if (!video) return;

                const progress = scrollTrigger.progress;

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
      };

      createTimeline();

      window.addEventListener("orientationchange", createTimeline);
      window.addEventListener("resize", createTimeline);

      return () => {
        window.removeEventListener("orientationchange", createTimeline);
        window.removeEventListener("resize", createTimeline);
      };
    },
    { scope: containerRef }
  );

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

  useEffect(() => {
    if (!isActive) return;

    const selector = gsap.utils.selector(containerRef);
    const randomNegX = gsap.utils.random(-40, -16, 2, true);
    const randomPosX = gsap.utils.random(16, 40, 2, true);
    const randomNegY = gsap.utils.random(-20, -10, 2, true);
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
      scale: 0.95,
      duration: () => randomDuration(),
      yoyo: true,
      repeat: -1,
    });
  }, [isActive]);

  return (
    <div ref={containerRef} className="w-full h-screen shrink-0 ">
      <div
        ref={contentRef}
        className="w-full h-screen fixed inset-0 z-10"
        style={{
          transform: `translateX(100%)`,
        }}
      >
        <div className="w-full h-svh flex items-center justify-center">
          <div
            className={VIDEO_WRAPPER_CLASSES}
            style={{
              // @ts-expect-error
              "--shadow-color1": adjustedColor + "50",
              "--shadow-color2": shiftHue(adjustedColor, 25) + "50",
              "--shadow-color3": shiftHue(adjustedColor, 75) + "50",
            }}
          >
            <div
              role="presentation"
              className="glow absolute inset-0 -z-[1] blur-xl bg-[var(--shadow-color1)]"
            />
            <div
              role="presentation"
              className="glow absolute inset-0 -z-[2] blur-xl bg-[var(--shadow-color2)]"
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

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useEffect, useMemo, useRef } from "react";

import { ProjectData, PROJECTS } from "@/resources/projects";
import { adjustColorLightnessAndSaturation } from "@/utils/colors";
import { shiftHue } from "@/utils/hue";

const VIDEO_WRAPPER_CLASSES = `bg-white relative landscape:p-[calc(0.02*80vmin)] landscape:rounded-[calc(0.08*80vmin)] portrait:p-[calc(0.02*70vmax)] portrait:rounded-[calc(0.08*70vmax)] size-fit border border-black`;
const VIDEO_PLAYER_CLASSES = `shadow-[0px_0px_0px_5px_#131313] aspect-[1178/2556] object-cover border border-black landscape:h-[80vmin] landscape:rounded-[calc(0.06*80vmin)] portrait:h-[70vmax] portrait:rounded-[calc(0.06*70vmax)]`;

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

  useGSAP(
    () => {
      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            scrub: true,
            preventOverlaps: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
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

      const onResize = () => {
        timeline.scrollTrigger?.refresh();
      };

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
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
    const selector = gsap.utils.selector(containerRef);
    const randomNegX = gsap.utils.random(-30, -10, 2, true);
    const randomPosX = gsap.utils.random(10, 30, 2, true);
    const randomNegY = gsap.utils.random(-20, -10, 2, true);
    const randomPosY = gsap.utils.random(10, 30, 2, true);
    const randomDuration = gsap.utils.random(7, 10, 0.5, true);

    gsap.set(selector(".glow"), {
      x: (i) => (i % 2 ? randomNegX() : randomPosX()),
      y: (i) => (i % 2 ? randomNegY() : randomPosY()),
    });

    gsap.to(selector(".glow"), {
      x: (i) => (i % 2 ? randomPosX() : randomNegX()),
      y: (i) => (i % 2 ? randomPosY() : randomNegY()),
      duration: () => randomDuration(),
      yoyo: true,
      repeat: -1,
    });
  }, []);

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

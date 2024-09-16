import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type FC, useRef } from "react";

import { SOCIAL_LINKS } from "@/resources/socialLinks";

const Intro: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom center",
            scrub: 2,
            onEnter: () => {
              gsap.set("#intro-content", {
                position: "fixed",
              });
            },
            onEnterBack: () => {
              gsap.set("#intro-content", {
                position: "fixed",
              });
            },
            onLeave: () => {
              gsap.set("#intro-content", {
                position: "static",
              });
            },
            onLeaveBack: () => {
              gsap.set("#intro-content", {
                position: "static",
              });
            },
          },
        })
        .to("h1, h2, a", {
          opacity: 0,
          y: -16,
          stagger: 0.2,
        });
    },
    { scope: containerRef }
  );

  return (
    <section id="intro" ref={containerRef} className="w-full h-svh">
      <div
        id="intro-content"
        className="w-full h-svh fixed inset-0 flex justify-center items-center flex-col p-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold md:mb-2">
          atanas dimitrov
        </h1>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 md:mb-4">
          react developer
        </h2>
        <div className="flex justify-center gap-2">
          {SOCIAL_LINKS.map((link, index) => {
            return (
              <a
                key={"link-" + index}
                className="w-12 h-12 flex justify-center items-center"
                target="_blank"
                rel="noreferrer"
                href={link.href}
              >
                {link.icon}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Intro;

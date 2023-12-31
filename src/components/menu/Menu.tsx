"use client";

import gsap from "gsap";
import React, { useState, type FC, useRef, useEffect } from "react";
import { Transition } from "react-transition-group";
import { CgMenuHotdog, CgClose } from "react-icons/cg";

const ITEMS = ["Atanas", "Projects", "Stack", "Contact"];

const Menu: FC = () => {
  const [show, setShow] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setBoxDimensions = () => {
      if (!container.current) return;
      const containerRect = container.current.getBoundingClientRect();

      const isPortrait = containerRect.height > containerRect.width;

      const diagonal = Math.sqrt(
        Math.pow(containerRect.width, 2) + Math.pow(containerRect.height, 2)
      );

      setWidth(diagonal);
      setHeight(isPortrait ? containerRect.width : containerRect.height);
    };

    setBoxDimensions();

    window.addEventListener("resize", setBoxDimensions);

    return () => {
      window.removeEventListener("resize", setBoxDimensions);
    };
  }, []);

  const onEnter = () => {
    if (!container.current) return;
    const containerRect = container.current.getBoundingClientRect();

    const shortSide =
      containerRect.height > containerRect.width
        ? containerRect.width
        : containerRect.height;

    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = Math.min(
      70,
      Math.max(50, Math.floor(Math.random() * 100))
    );

    gsap.set(".modal", { y: 0 });

    gsap.set(".item", {
      yPercent: (i) => -100 * i - shortSide,
      zIndex: (i) => ITEMS.length - i,
    });

    gsap.set(".item-bg", {
      backgroundColor: (i) => {
        if (i === 0) {
          return "#fff";
        }
        return `hsla(${randomHue + i * 45}, ${randomSaturation}%, 77%, 1)`;
      },
    });

    gsap.set(".backdrop", {
      opacity: 0,
      backgroundColor: `hsla(${
        randomHue + ITEMS.length * 45
      }, ${randomSaturation}%, 55%, 0.6)`,
    });
    gsap.set(".item", { opacity: 1 });
  };

  const onEntering = () => {
    gsap
      .timeline()
      .to(".item", {
        yPercent: 0,
        stagger: 0.25,
        duration: 1,
        ease: "back.out",
      })
      .to(
        ".backdrop",
        {
          opacity: 1,
        },
        0.8
      );
  };

  const onExiting = () => {
    if (!container.current) return;
    const containerRect = container.current.getBoundingClientRect();

    const shortSide =
      containerRect.height > containerRect.width
        ? containerRect.width
        : containerRect.height;

    gsap
      .timeline()
      .to(
        ".backdrop",
        {
          opacity: 0,
        },
        0
      )
      .to(
        ".item",
        {
          yPercent: (i) => -100 * i - shortSide,
          stagger: -0.1,
          ease: "back.in(0.8)",
        },
        0
      )
      .set(".modal", { y: "-100%" });
  };

  const animateMenuButton = () => {
    gsap.to("#menu-toggle", {
      rotate: 360,
      duration: 0.6,
      ease: "back.out(1.2)",
      onComplete: () => {
        gsap.set("#menu-toggle", { rotate: 0 });
      },
    });
  };

  const toggleMenu = () => {
    setShow((prev) => !prev);
    animateMenuButton();
  };

  return (
    <>
      <button
        id="menu-toggle"
        className="fixed z-10 bottom-2 right-2 flex w-12 h-12 justify-center items-center"
        onClick={toggleMenu}
      >
        {show ? <CgClose size="32" /> : <CgMenuHotdog size="40" />}
      </button>

      <Transition
        timeout={600}
        in={show}
        appear
        onEnter={onEnter}
        onEntering={onEntering}
        onExiting={onExiting}
      >
        <div
          ref={container}
          className="modal w-full h-full fixed top-0 left-0 -translate-y-full"
        >
          <div
            className="backdrop w-full h-full absolute top-0 left-0 bg-gray-500 backdrop-blur-sm bg-noise bg-32 opacity-0"
            onClick={toggleMenu}
          />

          <div
            className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center flex justify-center flex-col rotate-[-20deg] pointer-events-none"
            style={{
              width,
              height,
            }}
          >
            {ITEMS.map((label, index) => {
              return (
                <div
                  key={"label-" + index}
                  className="item pointer-events-auto relative opacity-0 w-full h-full max-h-28 flex-1 p-1 gap-4 flex items-center pl-[calc(50%_-_100px)]"
                >
                  <span
                    className="item-bg absolute left-0 bottom-0 w-full h-full -z-10 shadow-md bg-white bg-noise bg-32"
                    style={{ height }}
                  />
                  <span className="label font-extrabold text-3xl mix-blend-hard-light">
                    {label.toLowerCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Menu;

"use client";

import gsap from "gsap";
import React, { type FC, useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { GiHamburger } from "react-icons/gi";
import { Transition } from "react-transition-group";

import useMenuStore from "@/hooks/useMenuStore";
import {
  adjustColorLightnessAndSaturation,
  TARGET_LIGHTNESS,
  TARGET_SATURATION,
} from "@/utils/colors";

export const MENU_ITEMS = [
  { hash: "", label: "Atanas" },
  { hash: "projects", label: "Projects" },
  { hash: "tools", label: "Tools" },
  { hash: "contact", label: "Contact" },
];

const Menu: FC = () => {
  const show = useMenuStore((state) => state.show);
  const setShow = useMenuStore((state) => state.setShow);

  const timeline = useRef<GSAPTimeline>();

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

    gsap.set(".modal", { y: 0 });

    gsap.set(".menu-item", {
      yPercent: (i) => -100 * i - shortSide,
      zIndex: (i) => MENU_ITEMS.length - i,
      opacity: 1,
    });

    const themeColorMetaTag = document.querySelector(
      'meta[name="theme-color"]'
    );

    const themeColor = themeColorMetaTag?.getAttribute("content") || "#ffffff";
    const randomColor = `hsl(${
      Math.random() * 360
    }, ${TARGET_SATURATION}%, ${TARGET_LIGHTNESS}%)`;

    const isThemeColorWhite = themeColor === "#ffffff";

    const adjustedThemeColor = adjustColorLightnessAndSaturation(themeColor, {
      saturation: TARGET_SATURATION,
      lightness: TARGET_LIGHTNESS,
    });
    const menuItemColor = isThemeColorWhite ? randomColor : adjustedThemeColor;

    gsap.set(".menu-backdrop", {
      backgroundColor: themeColor + "50",
    });
    gsap.set(".menu-item-bg", {
      backgroundColor: (i) => (i === 0 ? themeColor : menuItemColor),
    });
  };

  const onEntering = () => {
    if (timeline.current) timeline.current.kill();

    timeline.current = gsap
      .timeline()
      .to(".menu-item", {
        yPercent: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: "back.out",
      })
      .to(
        ".menu-backdrop",
        {
          opacity: 1,
        },
        0.2
      );
  };

  const onExiting = () => {
    if (!container.current) return;
    const containerRect = container.current.getBoundingClientRect();

    const shortSide =
      containerRect.height > containerRect.width
        ? containerRect.width
        : containerRect.height;

    if (timeline.current) timeline.current.kill();

    timeline.current = gsap
      .timeline()
      .to(".menu-backdrop", { duration: 0.6, opacity: 0 })
      .to(
        ".menu-item",
        {
          yPercent: (i) => -100 * i - shortSide,
          stagger: -0.1,
          duration: 0.35,
          ease: "back.in(0.8)",
          opacity: 0,
        },
        0
      )
      .set(".modal", { y: "-100%" });
  };

  const toggleMenu = () => {
    gsap
      .timeline()
      .to("#menu-toggle", {
        x: 100,
        rotate: 30,
        duration: 0.4,
        ease: "back.in(2)",
        onComplete: () => {
          setShow(!show);
        },
      })
      .to("#menu-toggle", {
        x: 0,
        duration: 0.4,
        ease: "back.out(2)",
      })
      .to(
        "#menu-toggle",
        {
          rotate: 0,
          duration: 0.4,
          ease: "back.out(3)",
        },
        0.475
      );
  };

  // Disable scrolling when the menu is open
  useEffect(() => {
    if (show) {
      document.body.style.overflowY = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.touchAction = "auto";
    }
  }, [show]);

  return (
    <>
      <button
        id="menu-toggle"
        className="fixed z-10 bottom-3 right-3 flex w-12 h-12 justify-center items-center"
        onClick={toggleMenu}
      >
        {show ? <CgClose size="32" /> : <GiHamburger size="40" />}
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
            className="menu-backdrop w-full h-full absolute top-0 left-0 bg-white/50 backdrop-blur-sm bg-32 opacity-0"
            onClick={toggleMenu}
          />

          <div
            className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center flex justify-center flex-col rotate-[-20deg] pointer-events-none"
            style={{
              width,
              height,
            }}
          >
            {MENU_ITEMS.map((item, index) => {
              return (
                <a
                  key={"label-" + index}
                  className="menu-item pointer-events-auto relative opacity-0 w-full h-full max-h-28 flex-1 p-1 gap-4 flex items-center pl-[calc(50%_-_100px)]"
                  href={"/#" + item.hash}
                  onClick={() => setShow(false)}
                >
                  <span
                    className="menu-item-bg absolute left-0 bottom-0 w-full h-full -z-10 shadow-lg bg-white bg-32"
                    style={{ height, filter: `hue-rotate(${index * 25}deg)` }}
                  />
                  <span className="label font-extrabold text-3xl">
                    {item.label.toLowerCase()}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Menu;

"use client";

import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";

import ContactForm from "@/components/contact/Contact";
import Intro from "@/components/intro/Intro";
import { MENU_ITEMS } from "@/components/menu/Menu";
import Projects from "@/components/projects/Projects";
import Tools from "@/components/tools/Tools";
import { SwiperRef } from "@/types/swiper";

/**
 * When you import Swiper custom elements from node modules, we need to manually register them.
 * It should be done only once and it registers Swiper custom elements globally.
 */
register();

const WHEEL_DISTANCE = 16;

export default function Home() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const deltaY = e.deltaY;

      if (swiperRef.current?.swiper.animating) return;

      if (deltaY > WHEEL_DISTANCE) {
        swiperRef.current?.swiper.slideNext();
      } else if (deltaY < -WHEEL_DISTANCE) {
        swiperRef.current?.swiper.slidePrev();
      }
    };
    document.body.addEventListener("wheel", onWheel);

    return () => {
      document.body.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(() => {
    const onHashChange = (event: HashChangeEvent) => {
      const url = event.newURL;
      const hash = url.split("#")[1];

      const currentIndex = swiperRef.current?.swiper.activeIndex;
      const newIndex = MENU_ITEMS.findIndex((item) => item.hash === hash);

      if (newIndex >= 0 && newIndex !== currentIndex)
        swiperRef.current?.swiper.slideTo(newIndex);
    };

    const onSwiperSlideChange = (event: any) => {
      setActiveIndex(event.detail[0].activeIndex);
    };

    const swiperRefCurrent = swiperRef.current;

    window.addEventListener("hashchange", onHashChange);

    swiperRefCurrent?.addEventListener(
      "swiperslidechange",
      onSwiperSlideChange
    );

    setActiveIndex(swiperRefCurrent?.swiper?.activeIndex || 0);

    return () => {
      window.removeEventListener("hashchange", onHashChange);

      swiperRefCurrent?.removeEventListener(
        "swiperslidechange",
        onSwiperSlideChange
      );
    };
  }, []);

  return (
    <main className="w-full h-[100svh]">
      <swiper-container
        ref={swiperRef}
        slides-per-view={1}
        direction="vertical"
        pagination
        hash-navigation
      >
        <swiper-slide data-hash="" class="home-carousel-slide">
          <Intro />
        </swiper-slide>
        <swiper-slide data-hash="projects" class="home-carousel-slide">
          <Projects />
        </swiper-slide>
        <swiper-slide data-hash="tools" class="home-carousel-slide">
          <Tools isActiveSection={activeIndex === 2} />
        </swiper-slide>
        <swiper-slide data-hash="contact" class="home-carousel-slide">
          <ContactForm />
        </swiper-slide>
      </swiper-container>
    </main>
  );
}

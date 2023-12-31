"use client";

import ContactForm from "@/components/contact/Contact";
import Intro from "@/components/intro/Intro";
import { MENU_ITEMS } from "@/components/menu/Menu";
import Projects from "@/components/projects/Projects";
import Tools from "@/components/tools/Tools";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { register } from "swiper/element/bundle";
import { SwiperSlideProps } from "swiper/react";
import { SwiperOptions } from "swiper/types";

// Types based on -> https://github.com/nolimits4web/swiper/issues/6466#issuecomment-1464979762

/**
 * When you import Swiper custom elements from node modules, we need to manually register them.
 * It should be done only once and it registers Swiper custom elements globally.
 */
register();

type Kebab<
  T extends string,
  A extends string = ""
> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? "" : "-"}${Lowercase<F>}`>
  : A;

/**
 * Helper for converting object keys to kebab case because Swiper web components parameters are available as kebab-case attributes.
 * @link https://swiperjs.com/element#parameters-as-attributes
 */
type KebabObjectKeys<T> = {
  [key in keyof T as Kebab<key & string>]: T[key] extends Object
    ? KebabObjectKeys<T[key]>
    : T[key];
};

/**
 * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
 * @link https://github.com/nolimits4web/swiper/issues/6466
 *
 * All parameters can be found on the following page:
 * @link https://swiperjs.com/swiper-api#parameters
 */
type SwiperRef = HTMLElement & { swiper: Swiper; initialize: () => void };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": SwiperContainerAttributes;
      "swiper-slide": SwiperSlideAttributes;
    }

    interface SwiperContainerAttributes extends KebabObjectKeys<SwiperOptions> {
      ref?: RefObject<SwiperRef>;
      children?: ReactNode;
      class?: string;
    }
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {
      class?: string;
      key?: string;
    }
  }
}

export default function Home() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
        mousewheel
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

"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { type FC } from "react";

import Intro from "@/components/intro/Intro";
import Projects from "@/components/projects/Projects";

gsap.registerPlugin(ScrollTrigger);

const HomePage: FC = () => {
  return (
    <main className="w-full">
      <Intro />
      <Projects />
      <section className="w-full h-dvh"> TOOLS </section>
    </main>
  );
};

export default HomePage;

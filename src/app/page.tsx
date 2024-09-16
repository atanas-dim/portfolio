"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { type FC } from "react";

import ContactForm from "@/components/contact/Contact";
import Intro from "@/components/intro/Intro";
import Projects from "@/components/projects/Projects";
import Tools from "@/components/tools/Tools";

gsap.registerPlugin(ScrollTrigger);

const HomePage: FC = () => {
  return (
    <main className="w-full">
      <Intro />
      <Projects />
      <Tools />
      <ContactForm />
    </main>
  );
};

export default HomePage;

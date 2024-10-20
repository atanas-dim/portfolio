"use client";
import { type FC } from "react";

import ContactForm from "@/components/contact/Contact";
import Intro from "@/components/intro/Intro";
import Projects from "@/components/projects/Projects";
import Tools from "@/components/tools/Tools";

const HomePage: FC = () => {
  return (
    <main className="relative w-full ">
      <Intro />
      <Projects />
      <Tools />
      <ContactForm />
    </main>
  );
};

export default HomePage;

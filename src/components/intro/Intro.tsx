import { SOCIAL_LINKS } from "@/resources/socialLinks";
import React, { type FC } from "react";

const Intro: FC = () => {
  return (
    <section className="w-full h-[100svh] flex justify-center items-center flex-col p-8">
      <h1 className="text-3xl md:text-5xl font-extrabold md:mb-2">
        atanas dimitrov
      </h1>
      <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">
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
    </section>
  );
};

export default Intro;

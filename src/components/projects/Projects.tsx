import { PROJECTS } from "@/resources/projects";
import Image from "next/image";
import React, { type FC } from "react";

const Projects: FC = () => {
  return (
    <div className="p-8 w-full h-full flex justify-center md:items-center">
      <swiper-container
        slides-per-view={1}
        pagination
        navigation
        class="border border-solid border-gray-200 rounded-3xl h-full w-full max-h-[min(42rem,calc(100%_-_2rem))] shadow-inner-xl"
      >
        {PROJECTS.map((project, index) => {
          return (
            <swiper-slide
              key={"project-" + index}
              class="w-full h-full p-4 pb-6 flex flex-col items-center justify-center gap-2 md:gap-4 [&_*]:lowercase"
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                className=" max-h-[70%] max-w-[70%] object-contain rounded-xl flex-shrink"
              />
              <span className="text-xl font-extrabold">{project.title}</span>
              <span className="text-sm ">{project.technologies}</span>
              <div className="flex gap-3">
                {project.links.map((link, index) => {
                  return (
                    <a
                      key={
                        project.title.toLowerCase().split(" ").join("-") +
                        "-link-" +
                        index
                      }
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-400 px-3 py-2 rounded-lg leading-none"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </swiper-slide>
          );
        })}
      </swiper-container>
    </div>
  );
};

export default Projects;

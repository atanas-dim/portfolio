import { ADDITIONAL_TOOLS, BASE_TOOLS, MAIN_TOOLS } from "@/resources/tools";
import React, { type FC } from "react";

const Tools: FC = () => {
  return (
    <div className="w-full h-full justify-center p-8 flex flex-col gap-3 font-bold lowercase">
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {BASE_TOOLS.map((tool, index) => {
          return (
            <span key={"tool-" + index} className="text-xl md:text-4xl">
              {tool}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {MAIN_TOOLS.map((tool, index) => {
          return (
            <span key={"tool-" + index} className="text-3xl md:text-5xl">
              {tool}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {ADDITIONAL_TOOLS.map((tool, index) => {
          return (
            <span key={"tool-" + index} className="text-xl md:text-2xl">
              {tool}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Tools;

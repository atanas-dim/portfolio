import { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="w-full flex justify-center items-center pb-3">
      <div className="max-w-2xl w-full px-16 h-12 text-xs text-center flex items-center justify-center">
        2024 Created with NextJS, TailwindCSS & GSAP
      </div>
    </footer>
  );
};

export default Footer;

import { type FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="w-full flex justify-center items-center">
      <div className="max-w-2xl w-full px-16 pt-4 pb-8 text-xs text-center">
        Created with NextJS, TailwindCSS & GSAP | 2024
      </div>
    </footer>
  );
};

export default Footer;

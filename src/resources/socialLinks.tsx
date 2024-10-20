import { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiCodesandbox } from "react-icons/si";

type SocialLink = {
  icon: ReactNode;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <HiMail size="32" />,
    href: "mailto:a.dimitrov32@gmail.com",
  },
  {
    icon: <FaGithub size="32" />,
    href: "https://github.com/atanas-dim",
  },
  {
    icon: <SiCodesandbox size="24" />,
    href: "https://codesandbox.io/u/atanas-dim",
  },
  {
    icon: <FaLinkedin size="32" />,
    href: "https://www.linkedin.com/in/atanas-dim/",
  },
];

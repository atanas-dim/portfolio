import { ReactNode } from "react";
import { HiMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

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
    icon: <FaLinkedin size="32" />,
    href: "https://www.linkedin.com/in/atanas-dim/",
  },
];

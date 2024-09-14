import { StaticImageData } from "next/image";

import mapImg from "@/assets/images/mapbox-mobile.png";
import reactCalendarImg from "@/assets/images/react-calendar.jpg";
import redditClientImg from "@/assets/images/reddit-mobile.png";

export type ProjectData = {
  themeColor: string;
  videoSrc?: string;
  title: string;
  technologies: string;
  description?: string;
  links: { href: string; label: string }[];
  image: { src: StaticImageData; alt: string; isMobile?: boolean };
};

export const PROJECTS: ProjectData[] = [
  {
    themeColor: "#D70321",
    videoSrc: "/videos/sample-video.mp4",
    title: "Searching Mapbox",
    technologies: "React, TypeScript, SASS, Mapbox GL",
    description:
      "Using Mapbox GL API to search for nearby places. Custom features include search bar, theme toggler, collapsible list of nearby places.",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/searching-mapbox",
      },
      {
        label: "Live",
        href: "https://searching-mapbox.netlify.app/",
      },
    ],
    image: {
      src: mapImg,
      alt: "",
      isMobile: true,
    },
  },

  {
    themeColor: "#349649",
    title: "Reddit Client",
    technologies: "React, Redux, Reddit JSON API",
    description:
      "Front-end web application using the unofficial JSON Reddit API to recreate a simplified read-only version of the platform, featuring popular subreddits, filters, posts and comments.",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/reddit-client",
      },
      {
        label: "Live",
        href: "https://reddit-atanas.netlify.app/",
      },
    ],
    image: {
      src: redditClientImg,
      alt: "",
      isMobile: true,
    },
  },
  {
    themeColor: "#0000BD",
    title: "React Calendar",
    technologies: "React, TypeScript, date-fns, SASS",
    description:
      "A sandbox app using date-fns and CSS grid to create a responsive calendar.",
    links: [
      {
        label: "CodeSandbox",
        href: "https://codesandbox.io/p/devbox/react-grid-calendar-jt3ry6",
      },
    ],
    image: {
      src: reactCalendarImg,
      alt: "",
    },
  },
];

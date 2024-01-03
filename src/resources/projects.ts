import redditClientImg from "@/assets/images/reddit-mobile.png";
import reactCalendarImg from "@/assets/images/react-calendar.jpg";
import mapImg from "@/assets/images/mapbox-mobile.png";
import { StaticImageData } from "next/image";

export type ProjectData = {
  title: string;
  technologies: string;
  description?: string;
  links: { href: string; label: string }[];
  image: { src: StaticImageData; alt: string; isMobile?: boolean };
};

export const PROJECTS: ProjectData[] = [
  {
    title: "Searching Mapbox",
    technologies: "ReactJS, SASS, Mapbox GL",
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
    title: "React Calendar",
    technologies: "React, TypeScript, date-fns, SCSS",
    description:
      "A sandbox app using date-fns and CSS grid to create a responsive calendar.",
    links: [
      {
        label: "CodeSandbox",
        href: "https://codesandbox.io/s/react-grid-calendar-egcn3f?file=/src/components/calendar/Calendar.tsx",
      },
    ],
    image: {
      src: reactCalendarImg,
      alt: "",
    },
  },
];

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
};

function generateCloudinaryUrl(fileName: string, width: number) {
  return `https://res.cloudinary.com/atanasdim/video/upload/w_${width}/portfolio/${fileName}`;
}
export const PROJECTS: ProjectData[] = [
  {
    themeColor: "#f1dec2",
    videoSrc: generateCloudinaryUrl(
      "tiled-image-loader-compressed_ba1if1.mp4",
      400
    ),
    title: "Tiled Image Loader",
    technologies: "NextJS, TypeScript, TailwindCSS",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/tiled-image-loader",
      },
      {
        label: "Live",
        href: "https://tiled-image-loader.vercel.app/",
      },
    ],
  },

  {
    themeColor: "#00512F",
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
  },
];

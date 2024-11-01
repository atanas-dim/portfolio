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
    themeColor: "#f3e991",
    videoSrc: generateCloudinaryUrl(
      "shaders-playground-compressed_xqzupi.mp4",
      400
    ),
    title: "Shaders Playground",
    technologies: "NextJS, TypeScript, ThreeJS, GLSL",
    links: [
      {
        label: "Code",
        href: "https://github.com/atanas-dim/shaders-playground",
      },
      {
        label: "Live",
        href: "https://shaders-playground-psi.vercel.app/",
      },
    ],
  },
  {
    themeColor: "#3fa4ef",
    videoSrc: generateCloudinaryUrl(
      "searching-mapbox-compressed_ghrayz.mp4",
      400
    ),
    title: "Searching Mapbox",
    technologies: "React, TypeScript, Mapbox GL, SASS",
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
  },
];

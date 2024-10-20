import colors from "tailwindcss/colors";

export type SkillDef = {
  label: string;
  color?: string;
};

export const BASE_TOOLS: SkillDef[] = [
  {
    label: "HTML",
    color: colors.red[400],
  },
  {
    label: "CSS",
    color: colors.blue[400],
  },
  {
    label: "JavaScript",
    color: colors.yellow[400],
  },
];

export const MAIN_TOOLS: SkillDef[] = [
  { label: "React", color: colors.cyan[400] },
  { label: "TypeScript", color: colors.sky[400] },
  { label: "NextJS", color: colors.blue[400] },
  { label: "TailwindCSS", color: colors.purple[400] },
  { label: "SASS", color: colors.fuchsia[400] },
  { label: "MUI", color: colors.blue[400] },
  { label: "Supabase", color: colors.emerald[400] },
  { label: "Firebase", color: colors.orange[400] },
  { label: "MongoDB", color: colors.green[400] },
  {
    label: "GSAP",
    color: colors.lime[400],
  },
  { label: "AWS", color: colors.orange[400] },
];

export const ADDITIONAL_TOOLS: SkillDef[] = [
  {
    label: "PostgreSQL",
    color: colors.sky[400],
  },
  { label: "GraphQL", color: colors.pink[400] },
  { label: "ThreeJS", color: colors.indigo[400] },
  {
    label: "Framer Motion",
    color: colors.purple[400],
  },
  { label: "React Native", color: colors.cyan[400] },
  {
    label: "Git",
    color: colors.orange[400],
  },
  {
    label: "styled-components",
    color: colors.fuchsia[400],
  },

  {
    label: "i18next",
    color: colors.teal[400],
  },
  {
    label: "NodeJS",
    color: colors.emerald[400],
  },
];

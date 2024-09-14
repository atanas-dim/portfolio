import "@/styles/globals.css";

import type { Metadata } from "next";

import Menu from "@/components/menu/Menu";

export const metadata: Metadata = {
  title: "Atanas Dimitrov - Portfolio",
  other: { "theme-color": "#ffffff" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Menu />
      </body>
    </html>
  );
}

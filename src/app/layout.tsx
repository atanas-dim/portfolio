import type { Metadata } from "next";
import "@/styles/globals.css";
import Menu from "@/components/menu/Menu";

export const metadata: Metadata = {
  title: "Atanas Dimitrov - Portfolio",
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

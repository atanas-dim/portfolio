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
      <body className="bg-noise bg-32">
        {children}
        <Menu />
      </body>
    </html>
  );
}

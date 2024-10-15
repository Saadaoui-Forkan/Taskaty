import type { Metadata } from "next";
import "./globals.css";
import Fixed from "@/components/switcher";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Taskaty",
  description: "Notes App Project Using Nextjs | Typescript | PostgreSql",
  keywords: "notes, to do, todos, note, task, tasks",
  authors: [
    {
      name: "Saadaoui Mahmoud",
    },
  ],
  icons: {
    icon: "/icon.png",
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}

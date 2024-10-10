import type { Metadata } from "next";
import "./globals.css";
import { Tajawal  } from 'next/font/google';

const ubuntu = Tajawal ({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
});


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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        {children}
      </body>
    </html>
  );
}

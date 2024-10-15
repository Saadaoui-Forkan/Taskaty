## Custom  dark/light mode
__tailwind.config.ts__
```
const config: Config = {
  --------
  plugins: [],
  darkMode: "class",
};
```

__globals.css__: animation when the mode change
```
* {
  @apply transition-colors duration-300
}
```

__src/context/ThemeContext.ts__
```
"use client"

import { createContext, useState } from "react"

export const ThemeContext = createContext({
    darkMode: false,
    toggleMode: () => {},
})

export const ThemeProvider = ({ children }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const [darkMode, setDarkMode] = useState(false)

    const toggleMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider value = {{toggleMode, darkMode}}>
            <div className={`${darkMode && "dark"}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
```

__layout.tsx__
```
<html lang="en">
    <body className={ubuntu.className}>
    <ThemeProvider>
        -----
    </ThemeProvider>
    </body>
</html>
```

__import darkMode & toggleMode__
```
const {darkMode, toggleMode} = useContext(ThemeContext)

{/* Settings Button */}
onClick={toggleDropdown}
```
### Implementing next-intel
__src/i18n.ts__
```
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  timeZone: "Asia/Jerusalem"
}));
```

__src/middleware.ts__
```
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ["en", "fr", "ar"],
    defaultLocale: "ar",
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}
```

next.config.js
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  timeZone: "Asia/Jerusalem",
};

const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

module.exports = withNextIntl(nextConfig);

```

__src/app/layout.tsx__
```
import type { Metadata } from "next";
import "./globals.css";
import Fixed from "@/components/fixed";
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
  return children;
}

```

__src/app/page.tsx__
```
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/ar");
}
```

src/app/[locale]/layout.tsx
```
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Fixed from "@/components/fixed";
import { ThemeProvider } from "@/context/ThemeContext";
import { Tajawal } from "next/font/google";

const ubuntu = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
});

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={ubuntu.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <>
              <Fixed />
              {children}
            </>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

```
__switcher__
```
"use client";
import { ChangeEvent, useContext, useState, useTransition } from 'react';
import { ThemeContext } from "@/context/ThemeContext";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import { FiMoon, FiSun } from "react-icons/fi";

const Fixed = () => {
  const t = useTranslations("Fixed");
  const { darkMode, toggleMode } = useContext(ThemeContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const localActive = useLocale();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="flex items-center justify-center p-3 bg-coolGray dark:bg-gray-800 
                 text-rubyRed dark:text-white rounded-full shadow-lg cursor-pointer 
                 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <CiSettings className="text-2xl" />
        </div>

        {dropdownOpen && (
          <div
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            className="absolute bottom-full right-0 mb-4 w-48 bg-white dark:bg-gray-700 
                   border border-coolGray dark:border-gray-600 rounded-lg shadow-lg 
                   py-2 transition-all duration-300"
          >
            <div className="px-4 py-2 text-dustyGray dark:text-white">
              <label className="font-bold" htmlFor="language-select">
                {t("select")}:
              </label>
              <select
                id="language-select"
                defaultValue={localActive}
                onChange={onSelectChange}
                disabled={isPending}
                className="mt-1 block w-full border border-coolGray dark:border-gray-600 
                       bg-white dark:bg-slateGray text-slateGray dark:text-white 
                       rounded-lg focus:outline-none focus:ring focus:ring-leafGreen"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            <div
              onClick={toggleMode}
              className="flex items-center justify-between px-4 py-2 text-dustyGray 
                     dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 
                     cursor-pointer transition-all duration-300"
            >
              <span>{darkMode ? `${t("dark")}` : `${t("light")}`}</span>
              {darkMode ? <FiSun className="ml-2" /> : <FiMoon className="ml-2" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fixed;
```
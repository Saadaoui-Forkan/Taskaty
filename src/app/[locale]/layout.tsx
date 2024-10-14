import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Fixed from "@/components/fixed";
import { ThemeProvider } from "@/context/ThemeContext";
import { Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import NotFound from "./not-found";

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

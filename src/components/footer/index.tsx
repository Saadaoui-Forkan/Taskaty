import { useTranslations } from "next-intl";
import React from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className="w-full px-8 py-6 bg-coolGray dark:bg-slateGray text-dustyGray dark:text-white flex flex-col md:flex-row items-center justify-center ">
      <p className="text-center text-sm">
        {t("copyright")} ©{" "}
        <strong className="text-royalPurple dark:text-goldenYellow">
          saadaouidev.com
        </strong>
      </p>
    </div>
  );
};

export default Footer;

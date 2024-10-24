"use client";
import { useTranslations } from "next-intl";
import Auth from "@/components/auth/Auth";
import Image from "next/image";
import logo from "../../../public/logo.png";

const AuthForm = () => {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen bg-coolGray dark:bg-slateGray p-1 transition-all duration-300">
      {/* Logo Section */}
      <div className="flex justify-start items-start">
        <Image src={logo} alt="Taskaty" width={120} height={100} />
      </div>

      {/* Main Content */}
      <div className="text-center mb-5">
        <p className="text-lg text-dustyGray dark:text-white max-w-lg mx-auto leading-relaxed">
          <span className="text-2xl font-bold text-leafGreen dark:text-goldenYellow">
            Taskaty
          </span>{" "}
          {t("intro")}
          <span className="font-semibold text-royalPurple dark:text-coralRed">
            {t("start")}
          </span>
        </p>
      </div>

      {/* Bottom Section: AuthForm */}
      <div className="flex justify-center">
        <Auth />
      </div>
    </div>
  );
};

export default AuthForm;

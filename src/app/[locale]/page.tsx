import { useTranslations } from "next-intl";
import LoginForm from "@/components/auth/LoginForm";

const AuthForm = () => {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 p-6 transition-all duration-300">
      <h1 className="font-bold font-protest text-2xl text-gray-800 dark:text-white text-center mb-6">
        Taskaty
      </h1>

      <div className="max-w-96 text-center mb-8 space-y-6 mx-auto">
        <p
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed" 
        >
          {t("intro")}
        </p>

        <a
          href="#start"
          className="
            inline-block 
            bg-blue-600 dark:bg-blue-400 
            text-white font-medium 
            py-2 px-6 
            rounded-full 
            hover:bg-blue-700 dark:hover:bg-blue-500 
            transition-all duration-300
          "
        >
          {t("start")}
        </a>
      </div>

      {/* Form Section */}
      <div className="flex justify-center" id="start">
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthForm;
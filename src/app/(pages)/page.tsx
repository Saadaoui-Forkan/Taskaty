import Auth from "@/components/auth/Auth";
import Image from "next/image";
import logo from "../../../public/logo.png";

const AuthForm = () => {
  return (
    <div className="min-h-screen bg-coolGray p-1">
      
      <div className="flex justify-start items-start">
        <Image
          src={logo}
          alt="Taskaty"
          width={120} 
          height={100} 
        />
      </div>

      <div className="text-center mb-5">
        <p className="text-lg text-gray-700 max-w-lg mx-auto leading-relaxed">
          <span className="text-2xl font-bold text-green-600">Taskaty</span> is your personal to-do list app to easily manage, organize, and track your notes. Simplify your daily tasks with a clean and intuitive interface.
          <span className="font-semibold text-blue-500"> Get Started</span>
        </p>
      </div>

      {/* Bottom Section: AuthForm */}
      <div className="flex justify-center">
        <Auth/>
      </div>
    </div>
  );
};

export default AuthForm;

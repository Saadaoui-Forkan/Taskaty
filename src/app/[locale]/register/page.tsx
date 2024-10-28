import RegisterForm from '@/components/auth/RegisterForm';
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 dark:bg-gray-900">
      <h1 className="font-bold font-protest text-2xl text-gray-800 dark:text-white text-center mb-6">
        Taskaty
      </h1>
      <RegisterForm />
    </div>
  );
}

export default Page;
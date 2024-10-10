import React from 'react'

const LoadingPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="logo text-4xl mb-5">taskaty</h1>
            <div className="line-loader"></div>
        </div>
    );
  };
  
  export default LoadingPage;
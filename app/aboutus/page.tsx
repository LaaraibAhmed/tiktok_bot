import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="/avatar_logo.png"
            alt="AI Avatar Logo"
            className="mx-auto"
            width={150}
            height={150}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to AI LiveStream
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Your AI companion for Livestreaming!
        </p>
        <Link
          className="px-4 py-2 bg-[#FF7F00] text-white rounded hover:bg-[#885f37] transition duration-300"
          href={"/avatarbuilder"}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Page;

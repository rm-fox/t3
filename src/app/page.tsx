"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./components/logo.png"; // Adjust the path to your logo if needed

const MainPage = () => {
  const router = useRouter();
  const fullText =
    "The on-chain undercollateralised lending platform powered by AI. Leading the future of Liquid Collateral.";

  const [filter, setFilter] = useState("blur(5px)");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("none");
    }, 100); // Fast transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center bg-cover bg-center bg-no-repeat"
         style={{
           backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/background4.jpg')"
         }}
    >
      <div className="mb-4">
        <Image src={logo} alt="Website Logo" className="w-48 h-48 sm:w-64 sm:h-64" />
      </div>
      <p
        className={`text-sm sm:text-lg md:text-xl mb-8 transition-filter duration-500`}
        style={{ filter: filter }}
      >
        {fullText}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <button
          onClick={() => router.push("/agent")}
          className="px-6 py-3 bg-green-600 text-white rounded-md w-full sm:w-auto"
        >
          App
        </button>
        <button
          onClick={() => window.location.href = "https://3p0.gitbook.io/t3"}
          className="px-6 py-3 bg-purple-600 text-white rounded-md w-full sm:w-auto"
        >
          Docs
        </button>
      </div>
    </div>
  );
};

export default MainPage;

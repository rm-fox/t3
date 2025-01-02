"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./components/logo.png"; // Path to the main logo
import longLogo from "./components/long_logo.png"; // Path to the additional image

const MainPage = () => {
  const router = useRouter();

  const [filter, setFilter] = useState("blur(5px)");

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("none");
    }, 100); // Fast transition
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-black text-white text-center bg-cover bg-center bg-no-repeat"
      style={{
        fontFamily: "'Roboto Mono', monospace", // Modern tech-like font
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/background4.jpg')",
      }}
    >
      {/* Main Logo */}
      <div className="mt-[-4rem] mb-1"> {/* Move logos higher and add small buffer below */}
        <Image src={logo} alt="Website Logo" className="w-55 h-55 sm:w-64 sm:h-64" />
      </div>

      {/* Second Image (Long Logo) */}
      <div className="mb-11"> {/* Added buffer below the long logo */}
        <Image src={longLogo} alt="Additional Logo" className="w-64 h-auto sm:w-96" />
      </div>

      {/* Smaller Text with Break */}
      <p
        className={`text-sm sm:text-md md:text-lg mt-4 mb-8 transition-filter duration-500`}
        style={{ filter: filter }}
      >
        The on-chain undercollateralised lending platform powered by AI.
        <br />
        Leading the future of Liquid Collateral.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <button
          onClick={() => router.push("/agent")}
          className="px-6 py-3 bg-green-700 text-white rounded-md w-full sm:w-auto shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          [app]
        </button>
        <button
          onClick={() => (window.location.href = "https://3p0.gitbook.io/t3")}
          className="px-6 py-3 bg-purple-700 text-white rounded-md w-full sm:w-auto shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          [docs]
        </button>
        <button
          onClick={() => window.open("/whitepaper.pdf", "_blank")}
          className="px-6 py-3 bg-blue-700 text-white rounded-md w-full sm:w-auto shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          [whitepaper]
        </button>
      </div>
    </div>
  );
};

export default MainPage;




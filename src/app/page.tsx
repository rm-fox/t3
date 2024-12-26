
"use client";

import React, { useState, useEffect, Component } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./components/logo.png"; // Adjust the path to your logo if needed

const MainPage = () => {
  const router = useRouter();
  const fullText = "The on-chain undercollateralised lending platform powered by AI. Leading the future of Liquid Collateral.";

  const [filter, setFilter] = useState("blur(5px)"); // Start with pixelated (blurry) effect

  useEffect(() => {
    // Remove pixelation after a shorter delay to speed up the loading effect
    const timer = setTimeout(() => {
      setFilter("none"); // Remove blur to make the text smooth
    }, 100); // Faster transition (1.5 seconds)

    return () => clearTimeout(timer); // Clean up the timeout when the component unmounts
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.logoWrapper}>
        <Image src={logo} alt="Website Logo" style={styles.logo} />
      </div>
      <p style={{ ...styles.description, filter: filter }}>
        {fullText}
      </p> {/* Full text with pixelated effect */}
      <div style={styles.buttonContainer}>
        <button onClick={() => router.push("/agent")} style={styles.button}>
          App
        </button>
        <button
          onClick={() => window.location.href = "https://3p0.gitbook.io/t3"}
          style={styles.button}
        >
          Docs
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as "center",
    color: "#ffffff", // White text for contrast
    backgroundColor: "#000000", // Fallback color
    // backgroundImage: `
    //   linear-gradient(135deg, rgba(36, 40, 80, 0.8), rgba(0, 0, 0, 0.8)),
    //   url('https://source.unsplash.com/random/1920x1080?nature')
    // `,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/images/background4.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  logoWrapper: {
    marginBottom: "20px",
  },
  logo: {
    width: "400px",
    height: "400px",
  },
  description: {
    fontSize: "20px",
    marginBottom: "50px",
    color: "#ffffff", // White text for description
    height: "auto", // Allow the text to grow
    overflow: "hidden", // Prevent overflow
    whiteSpace: "nowrap", // Prevent text wrapping
    fontFamily: "GeistVF, Arial, sans-serif", // Use your custom font
    letterSpacing: "2px", // Optional, adds space between characters
    transition: "filter 0.5s ease-in-out", // Shorter transition (0.5s) to make it faster
  },
  buttonContainer: {
    display: "flex",
    gap: "60px",
  },
  button: {
    padding: "10px 30px",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#6c63ff", // Purple background
    color: "#fff", // White text
    boxShadow: "0 6px 12px rgba(64, 224, 208, 0.6)", // Turquoise shadow
    transition: "all 0.3s ease", // Smooth transition for shadow and hover effect
  },
};


export default MainPage;






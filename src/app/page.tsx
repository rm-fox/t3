"use client";

import React, { useState, useEffect } from "react";
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
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            font-size: 14px;
          }
          .logo {
            width: 200px;
            height: 200px;
          }
          .description {
            font-size: 12px;
            letter-spacing: 1px;
          }
          .buttonContainer {
            gap: 20px;
          }
          .button {
            font-size: 14px;
            padding: 6px 20px;
          }
        }
        @media (max-width: 480px) {
          div {
            font-size: 12px;
          }
          .logo {
            width: 150px;
            height: 150px;
          }
          .description {
            font-size: 10px;
            margin-bottom: 20px;
          }
          .buttonContainer {
            gap: 15px;
          }
          .button {
            font-size: 12px;
            padding: 4px 15px;
          }
        }
      `}</style>
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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/images/background4.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  logoWrapper: {
    marginBottom: "20px",
  },
  logo: {
    width: "300px", // Slightly smaller size for the logo
    height: "300px", // Slightly smaller size for the logo
  },
  description: {
    fontSize: "15px", // Decreased font size
    marginBottom: "40px", // Reduced bottom margin
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
    gap: "50px", // Reduced gap between buttons
  },
  button: {
    padding: "8px 25px", // Smaller padding
    border: "none",
    borderRadius: "5px",
    fontSize: "16px", // Decreased font size for the buttons
    cursor: "pointer",
    backgroundColor: "#6c63ff", // Purple background
    color: "#fff", // White text
    boxShadow: "0 6px 12px rgba(64, 224, 208, 0.6)", // Turquoise shadow
    transition: "all 0.3s ease", // Smooth transition for shadow and hover effect
  },
};

export default MainPage;

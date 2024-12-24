"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./components/logo.png"; // Adjust the path to your logo if needed

const MainPage = () => {
  const router = useRouter();
  const fullText = "Collateral, liquified - first on-chain\nundercollateralised lending platform powered by AI";

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
        <button onClick={() => router.push("/trading")} style={styles.button}>
          Trade
        </button>
        <button
          onClick={() => window.location.href = "https://3p0.gitbook.io/t3"}
          style={styles.button}
        >
          About Us
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
    backgroundColor: "#000000", // Black background
    textAlign: "center" as "center",
    color: "#ffffff", // White text for contrast
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
    // Removed uppercase transformation to maintain the case
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








// // /src/app/page.tsx
// import React from 'react';

// const HomePage = () => {
//   return <div>Welcome to the Home Page!</div>;
// };

// export default HomePage; // Default export



// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import logo from "./components/logo.png"; // Adjust the path to your logo

// const MainPage = () => {
//   const router = useRouter();
//   const [typedText, setTypedText] = useState(""); // State to hold the dynamically typed text
//   const fullText = "Collateral, liquified - trade any asset and earn stake on your loan ";

//   useEffect(() => {
//     let charIndex = 0; // Index of the current character being typed
//     const typingInterval = setInterval(() => {
//       if (charIndex < fullText.length) {
//         setTypedText((prev) => prev + fullText[charIndex]);
//         charIndex++;
//       } else {
//         clearInterval(typingInterval); // Clear interval when typing is complete
//       }
//     }, 15); // Typing speed in milliseconds

//     return () => clearInterval(typingInterval); // Cleanup on component unmount
//   }, []);

//   return (
//     <div style={styles.page}>
//       <div style={styles.logoWrapper}>
//         <Image src={logo} alt="Website Logo" style={styles.logo} />
//       </div>
//       <p style={styles.description}>{typedText}</p> {/* Dynamically typed text */}
//       <div style={styles.buttonContainer}>
//         <button onClick={() => router.push("/Trade")} style={styles.button}>
//           Trade
//         </button>
//         <button onClick={() => router.push("/AboutUs")} style={styles.button}>
//           About Us
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     fontFamily: "Arial, sans-serif",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column" as "column",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000000", // Black background
//     textAlign: "center" as "center",
//     color: "#ffffff", // White text for contrast
//   },
//   logoWrapper: {
//     marginBottom: "0px",
//   },
//   logo: {
//     width: "400px",
//     height: "400px",
//   },
//   description: {
//     fontSize: "20px",
//     marginBottom: "50px",
//     color: "#ffffff", // White text for description
//     height: "30px", // Height to prevent layout shifting
//     overflow: "hidden", // Prevent overflow during typing
//     whiteSpace: "nowrap", // Prevent text wrapping
//   },
//   buttonContainer: {
//     display: "flex",
//     gap: "60px",
//   },
//   button: {
//     padding: "10px 30px",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "18px",
//     cursor: "pointer",
//     backgroundColor: "#6c63ff",
//     color: "#fff",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   },
// };

// export default MainPage;

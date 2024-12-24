// // /src/pages/index.tsx

// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import logo from "../components/logo.png"; // Adjust the path to your logo

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

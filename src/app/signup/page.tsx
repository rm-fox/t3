"use client";

import React from "react";
import Image from "next/image";
import logo from "../components/logo.png";

const SignUpPage: React.FC = () => {
  return (
    <div style={styles.page}>
      <div style={styles.logoWrapper}>
        <Image src={logo} alt="Website Logo" style={styles.logo} />
      </div>

      <p style={styles.description}>
      Due to high demand, our Agent is currently only available for Beta users. Sign up for general release and airdop access below or follow our Telegram.
      </p>

      <div style={styles.buttonGroup}>
        <a
          href="https://x.com/trustInWeb3" // Replace with your X profile URL
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.button, backgroundColor: "#6c63ff" }} // Set to the purple color
        >
          Follow us on X
        </a>
        <button
          type="button"
          style={{ ...styles.button, backgroundColor: "#0088cc" }}
          onClick={() => window.location.href = "https://t.me/+OA0-xx3wPBI5NDQy"}
        >
          Join Telegram
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
    color: "#ffffff",
    backgroundColor: "#000000",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/images/background4.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  logoWrapper: {
    marginBottom: "20px",
  },
  logo: {
    width: "200px",
    height: "200px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "40px",
    color: "#ffffff",
    fontFamily: "GeistVF, Arial, sans-serif",
    letterSpacing: "1.5px",
    lineHeight: "1.5",
    maxWidth: "600px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap" as "wrap",
  },
  button: {
    padding: "10px 25px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#6c63ff", // default purple color
    color: "#fff",
    boxShadow: "0 6px 12px rgba(64, 224, 208, 0.6)",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap" as "nowrap",
    textDecoration: "none", // Ensures the link looks like a button
    textAlign: "center" as "center",
  },
};

export default SignUpPage;

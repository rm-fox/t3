// components/CoinPanel.tsx
import React from "react";
import Image from "next/image";
import logo from "../components/logo.png"; // Placeholder logo

const CoinPanel: React.FC = () => {
  // List of commonly traded coin abbreviations
  const coinNames = [
    "JUP", "SOL", "BTC", "ETH", "POP", "CHILL", "WIF", "CITADEL"
  ];

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "500px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontSize: "20px",
          color: "#495057",
        }}
      >
        Commonly Traded
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
          gridTemplateRows: "repeat(4, auto)", // 4 rows
          gap: "20px",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {coinNames.map((coin, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                border: "2px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={logo} alt={`Coin ${coin}`} width={50} height={50} />
            </div>
            <p
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#495057",
              }}
            >
              {coin} {/* Coin abbreviation */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinPanel;

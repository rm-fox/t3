import React from "react";

export interface SidePanelProps {
  content: string;
  walletAddress?: string;
}

export const SidePanel = ({ content, walletAddress }: SidePanelProps) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        {walletAddress && (
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#e9ecef",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "16px",
                color: "#495057",
              }}
            >
              Connected Wallet
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                wordBreak: "break-all",
                color: "#6c757d",
              }}
            >
              {walletAddress}
            </p>
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            color: "#6c757d",
            fontSize: "18px",
            lineHeight: "1.5",
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};
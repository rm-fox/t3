"use client";

import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAddressToInt } from "./utils/walletconv";
import { SidePanel } from "./components/SidePanel"; // Import the SidePanel component

const Page = () => {
  const { publicKey } = useWallet(); // Get the wallet public key

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]); // Chat messages
  const [currentInput, setCurrentInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isClient, setIsClient] = useState(false); // Track if component is mounted
  const [sideContent, setSideContent] = useState("Welcome to Risk Manager!"); // Initial side content

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSendMessage = async () => {
    if (!publicKey) {
      setError("No wallet connected");
      return;
    }

    const walletAddress = publicKey.toString();
    const walletInt = walletAddressToInt(walletAddress);

    if (!currentInput.trim()) return; // Prevent empty input

    const userMessage = { sender: "user", text: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput(""); // Clear input
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentInput, // Send user input to the API
          wallet_address: walletAddress,
          thread_id: walletInt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const content =
        data.result[0]?.assistant?.messages?.content ||
        data.result[1]?.assistant?.messages?.content ||
        data.result[2]?.assistant?.messages?.content ||
        "No content available";

      const botMessage = { sender: "bot", text: content };
      setMessages((prev) => [...prev, botMessage]);

      // Update side content with part of the bot reply
      if (content.includes("user address")) {
        setSideContent(`Address: ${walletAddress}`);
      } else {
        setSideContent(content.slice(0, 100)); // Show the first 100 characters of the reply
      }
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error occurred";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Error: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    handleSendMessage(); // Send message
  };

  if (!isClient) {
    return null; // Return null while the component is not mounted on the client
  }

  return (
    <div style={styles.page}>
      <WalletMultiButton />
      <div style={styles.container}>
        {/* Left Column - Replaced with SidePanel */}
        <SidePanel content={sideContent} walletAddress={publicKey?.toString()} />

        {/* Right Column */}
        <div style={styles.rightColumn}>
          <h1 style={styles.header}>Your Agent</h1>
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageContainer,
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
                    color: msg.sender === "user" ? "#0f5132" : "#842029",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div style={styles.loading}>Agent is typing...</div>}
          </div>
          <form onSubmit={handleSubmit} style={styles.inputForm}>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your message..."
              required
              style={styles.inputField}
            />
            <button type="submit" style={styles.sendButton}>
              Send
            </button>
          </form>
          {error && <div style={styles.error}>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
  },
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    maxWidth: "1200px",
    margin: "20px auto",
    gap: "20px",
  },
  leftColumn: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sideContent: {
    textAlign: "center" as "center",
    color: "#6c757d",
    fontSize: "18px",
    lineHeight: "1.5",
  },
  rightColumn: {
    flex: 2,
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as "column",
  },
  header: {
    textAlign: "center" as "center",
    color: "#0d6efd",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    height: "600px",
    overflowY: "scroll" as "scroll",
    backgroundColor: "#ffffff",
  },
  messageContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  messageBubble: {
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%",
    wordWrap: "break-word" as "break-word",
  },
  loading: {
    textAlign: "center" as "center",
    color: "#6c757d",
    fontStyle: "italic",
  },
  inputForm: {
    display: "flex",
    marginTop: "10px",
  },
  inputField: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#f1f1f1",
    color: "#333",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    marginTop: "10px",
    color: "#842029",
    textAlign: "center" as "center",
  },
};

export default Page;
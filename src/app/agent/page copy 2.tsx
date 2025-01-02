"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAddressToInt } from "../utils/walletconv";
import Link from "next/link";
import Image from "next/image";
import logo from "../components/logo.png";

const Page = () => {
  const { publicKey } = useWallet();

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false);

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

    if (!currentInput.trim()) return;

    const userMessage = { sender: "user", text: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput("");
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
          question: currentInput,
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
    event.preventDefault();
    handleSendMessage();
  };

  const handleEmailSubmit = () => {
    if (!email.trim()) {
      alert("Please enter a valid email address!");
      return;
    }
    console.log("Email submitted:", email);
    alert("Thank you! We'll keep you updated.");
    setEmail("");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.overlayContent}>
          <h2 style={styles.overlayHeader}>
            Access to the AI agent terminal is temporarily paused for new users.
          </h2>
          <p style={styles.overlayText}>
            This is due to current onboarding limits as we work to interface with the soon-to-be-announced lending protocol.
          </p>
          <p style={styles.overlayText}>
            Expected re-opening to further users on 05/01/2025.
          </p>

          <div style={styles.logoContainer}>
            <Image src={logo} alt="Website Logo" className="w-48 h-48 sm:w-64 sm:h-64" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEmailSubmit();
            }}
            style={styles.emailForm}
          >
            <div style={styles.inputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={styles.emailInput}
              />
              <button type="submit" style={styles.emailButton}>
                Sign Up
              </button>
            </div>
          </form>

          <div style={styles.socialButtons}>
            <a
              href="https://x.com/trustInWeb3"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialButtonX}
            >
             [    X    ]
            </a>
            <a
              href="https://t.me/trustInWeb3_AI"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialButtonTelegram}
            >
              [Telegram]
            </a>
          </div>
        </div>
      </div>

      <div style={styles.topBar}>
        <div style={styles.buttonGroup}>
          <WalletMultiButton />
          <Link href="https://3p0.gitbook.io/t3" style={styles.documentationButton}>
            [docs]
          </Link>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.rightColumn}>
          <h1 style={styles.header}>T3 [Trust in Web 3.0] Agent</h1>
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
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div style={styles.loading}>T3 [Trust in Web 3.0] Agent is typing...</div>}
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

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  page: {
    fontFamily: "'Roboto Mono', monospace", 
    backgroundColor: "#000000",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/background4.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  overlayContent: {
    textAlign: "center" as "center",
  },
  overlayHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#fff",
  },
  overlayText: {
    fontSize: "16px",
    marginBottom: "20px",
    color: "#fff",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
  },
  emailForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    marginTop: "20px",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  emailInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "250px",
    fontSize: "14px",
  },
  emailButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#7c3aed",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  socialButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  socialButtonX: {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#1DA1F2",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
  },
  socialButtonTelegram: {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#0088cc",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#000000",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  documentationButton: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#7c3aed",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "none",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "1200px",
    margin: "20px auto",
    gap: "20px",
  },
  rightColumn: {
    flex: 2,
    backgroundColor: "#000000",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    color: "#7c3aed",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    height: "600px",
    overflowY: "scroll",
    backgroundColor: "#000000",
  },
  messageContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  messageBubble: {
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  loading: {
    textAlign: "center",
    color: "#777",
  },
  inputForm: {
    display: "flex",
    marginTop: "10px",
    gap: "10px",
  },
  inputField: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  sendButton: {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#7c3aed",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Page;




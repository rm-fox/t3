// "use client";

// import React, { useEffect, useState } from "react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { walletAddressToInt } from "../utils/walletconv";
// import { SidePanel } from "../components/SidePanel"; // Adjust path to the SidePanel component
// import Image from "next/image";
// import logo from "../components/logo.png";

// const TradingPage = () => {
//   const { publicKey } = useWallet();

//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   const [currentInput, setCurrentInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [sideContent, setSideContent] = useState("Welcome to Risk Manager!");

//   // Handle sending a trade message to the chat
//   const handleTrade = (ticker: string) => {
//     const tradeMessage = `Trade ${ticker}`;
//     setMessages((prev) => [
//       ...prev,
//       { sender: "user", text: tradeMessage },
//     ]);
//   };

//   const handleSendMessage = async () => {
//     if (!publicKey) {
//       setError("No wallet connected");
//       return;
//     }

//     const walletAddress = publicKey.toString();
//     const walletInt = walletAddressToInt(walletAddress);

//     if (!currentInput.trim()) return;

//     const userMessage = { sender: "user", text: currentInput };
//     setMessages((prev) => [...prev, userMessage]);
//     setCurrentInput("");
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: currentInput,
//           wallet_address: walletAddress,
//           thread_id: walletInt,
//         }),
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       const content =
//         data.result[0]?.assistant?.messages?.content ||
//         data.result[1]?.assistant?.messages?.content ||
//         data.result[2]?.assistant?.messages?.content ||
//         "No content available";

//       const botMessage = { sender: "bot", text: content };
//       setMessages((prev) => [...prev, botMessage]);
//       setSideContent(content.slice(0, 100));
//     } catch (error) {
//       const errorMessage = (error as Error).message || "Unknown error occurred";
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: `Error: ${errorMessage}` },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.logoWrapper}>
//         <Image src={logo} alt="Logo" style={styles.logo} />
//       </div>
//       <div style={styles.walletButtonWrapper}>
//         <WalletMultiButton />
//       </div>
//       <div style={styles.container}>
//         <SidePanel
//           content={sideContent}
//           walletAddress={publicKey?.toString()}
//           onTrade={handleTrade} // Pass the onTrade handler
//         />
//         <div style={styles.rightColumn}>
//           <h1 style={styles.header}>Your Agent</h1>
//           <div style={styles.chatBox}>
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   ...styles.messageContainer,
//                   justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
//                 }}
//               >
//                 <div
//                   style={{
//                     ...styles.messageBubble,
//                     backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
//                     color: msg.sender === "user" ? "#0f5132" : "#842029",
//                   }}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && <div style={styles.loading}>Agent is typing...</div>}
//           </div>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSendMessage();
//             }}
//             style={styles.inputForm}
//           >
//             <input
//               type="text"
//               value={currentInput}
//               onChange={(e) => setCurrentInput(e.target.value)}
//               placeholder="Type your message..."
//               required
//               style={styles.inputField}
//             />
//             <button type="submit" style={styles.sendButton}>
//               Send
//             </button>
//           </form>
//           {error && <div style={styles.error}>Error: {error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     fontFamily: "Arial, sans-serif",
//   },
//   logoWrapper: {
//     position: "absolute" as "absolute",
//     top: "0",
//     left: "10px",
//     zIndex: 10,
//   },
//   logo: {
//     width: "100px",
//     height: "100px",
//   },
//   walletButtonWrapper: {
//     position: "absolute" as "absolute",
//     top: "20px",
//     right: "20px",
//     zIndex: 10,
//   },
//   container: {
//     display: "flex",
//     flexDirection: "row" as "row",
//     maxWidth: "1200px",
//     margin: "100px auto",
//     gap: "20px",
//   },
//   leftColumn: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "500px",
//   },
//   sideContent: {
//     textAlign: "center" as "center",
//     color: "#6c757d",
//     fontSize: "18px",
//     lineHeight: "1.5",
//   },
//   rightColumn: {
//     flex: 2,
//     backgroundColor: "#ffffff",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column" as "column",
//     height: "500px", // Ensure equal height for both columns
//     position: "relative", // Ensure the box is positioned for the shadow
//   },
//   header: {
//     textAlign: "center" as "center",
//     color: "#000000",
//     marginBottom: "20px",
//     fontSize: "24px",
//     fontWeight: "bold",
//   },
//   chatBox: {
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     padding: "10px",
//     height: "420px",
//     overflowY: "scroll" as "scroll",
//     backgroundColor: "#ffffff",
//   },
//   messageContainer: {
//     display: "flex",
//     marginBottom: "10px",
//   },
//   messageBubble: {
//     padding: "10px 15px",
//     borderRadius: "15px",
//     maxWidth: "70%",
//     wordWrap: "break-word" as "break-word",
//   },
//   loading: {
//     textAlign: "center" as "center",
//     color: "#6c757d",
//     fontStyle: "italic",
//   },
//   inputForm: {
//     display: "flex",
//     marginTop: "10px",
//   },
//   inputField: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//     backgroundColor: "#f1f1f1",
//     color: "#333",
//   },
//   sendButton: {
//     marginLeft: "10px",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     border: "none",
//     backgroundColor: "#a370f0",
//     color: "#fff",
//     fontSize: "16px",
//     cursor: "pointer",
//   },
//   error: {
//     marginTop: "10px",
//     color: "#842029",
//     textAlign: "center" as "center",
//   },

//   // Stronger turquoise shadow
//   shadowEffect: {
//     position: "absolute" as "absolute",
//     bottom: "-15px", // Increased to make the shadow more prominent
//     left: "0",
//     right: "0",
//     height: "15px", // Increased height for a stronger shadow
//     background: "linear-gradient(180deg, rgba(0, 188, 212, 0.7), rgba(0, 188, 212, 0.3))", // More intense turquoise shadow
//     borderRadius: "10px", // Optional: add radius for a smoother look
//   },
// };

// export default TradingPage;
"use client";

import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAddressToInt } from "../utils/walletconv";
import SidePanel from "../components/Sidepanel"; // Import the SidePanel component
import CoinPanel from "../components/CoinPanel"; // Import CoinPanel component
import Image from "next/image";
import logo from "../components/logo.png"; // Import logo

const TradingPage = () => {
  const { publicKey } = useWallet();

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sideContent, setSideContent] = useState("Welcome to Risk Manager!");

  // Handle sending a trade message to the chat
  const handleTrade = (ticker: string) => {
    const tradeMessage = `Trade ${ticker}`;
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: tradeMessage },
    ]);
  };

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

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const content =
        data.result[0]?.assistant?.messages?.content ||
        data.result[1]?.assistant?.messages?.content ||
        data.result[2]?.assistant?.messages?.content ||
        "No content available";

      const botMessage = { sender: "bot", text: content };
      setMessages((prev) => [...prev, botMessage]);
      setSideContent(content.slice(0, 100));
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

  return (
    <div style={styles.page}>
      {/* Logo and Wallet Button aligned horizontally */}
      <div style={styles.headerContainer}>
        <div style={styles.logoWrapper}>
          <Image src={logo} alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.walletButtonWrapper}>
          <WalletMultiButton />
        </div>
      </div>

      <div style={styles.container}>
        <SidePanel
          content={sideContent}
          walletAddress={publicKey?.toString()}
          onTrade={handleTrade} // Pass the onTrade handler
        />
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={styles.inputForm}
          >
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
  // Container for the logo and wallet button, positioned at the top
  headerContainer: {
    display: "flex",
    justifyContent: "space-between", // Align them horizontally
    alignItems: "center", // Vertically center both elements
    padding: "10px 20px", // Add some padding to the top
  },
  logoWrapper: {
    flex: 1,
  },
  logo: {
    width: "100px",
    height: "100px",
  },
  walletButtonWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end", // Align the button to the right
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
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    height: "500px", // Ensure equal height for both columns
  },
  header: {
    textAlign: "center",
    color: "#000000",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    height: "420px",
    overflowY: "scroll",
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
    wordWrap: "break-word",
  },
  loading: {
    textAlign: "center",
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
    backgroundColor: "#a370f0",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    marginTop: "10px",
    color: "#842029",
    textAlign: "center",
  },
};

export default TradingPage;

// // /src/pages/TradingPage.tsx

// import React, { useState, useEffect } from 'react';
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { walletAddressToInt } from "../utils/walletconv";

// const TradingPage: React.FC = () => {
//   const { publicKey } = useWallet(); // Get the wallet public key
//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   const [currentInput, setCurrentInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isClient, setIsClient] = useState(false);
//   const [sideContent, setSideContent] = useState("Welcome to Risk Manager!");

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

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

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const content = 
//           data.result[0]?.assistant?.messages?.content || 
//           data.result[1]?.assistant?.messages?.content || 
//           data.result[2]?.assistant?.messages?.content || 
//           "No content available";

//       const botMessage = { sender: "bot", text: content };
//       setMessages((prev) => [...prev, botMessage]);

//       if (content.includes("user address")) {
//         setSideContent(`Address: ${walletAddress}`);
//       } else {
//         setSideContent(content.slice(0, 100));
//       }
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

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     handleSendMessage();
//   };

//   if (!isClient) return null;

//   return (
//     <div>
//       <WalletMultiButton />
//       <div>
//         <div>
//           <div>{sideContent}</div>
//         </div>

//         <div>
//           <h1>Your Agent</h1>
//           <div>
//             {messages.map((msg, index) => (
//               <div key={index} style={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
//                 <div>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && <div>Agent is typing...</div>}
//           </div>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               value={currentInput}
//               onChange={(e) => setCurrentInput(e.target.value)}
//               placeholder="Type your message..."
//               required
//             />
//             <button type="submit">Send</button>
//           </form>
//           {error && <div>Error: {error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TradingPage;

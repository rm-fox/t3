
// "use client";

// // import { useState } from "react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useEffect, useState } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { createHash } from "crypto";

// // Convert wallet address to integer
// export function walletAddressToInt(walletAddress: string): number {
//   const hash = createHash("sha256").update(walletAddress).digest("hex");
//   const bigInt = BigInt("0x" + hash);
//   const number = bigInt % BigInt(Number.MAX_SAFE_INTEGER);
//   return Number(number);
// }

// const Page = () => {
//   const { publicKey } = useWallet(); // Get the wallet public key

//   const [messages, setMessages] = useState([]); // Chat messages
//   const [currentInput, setCurrentInput] = useState(""); // User input
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleSendMessage = async () => {
//     const [error, setError] = useState<string | null>(null); // Allow error to be a string or null

//     if (!publicKey) {
//       setError("No wallet connected"); // No TypeScript error now
//       return;
//     }
    
//     const walletAddress = publicKey.toString();
//     const walletInt = walletAddressToInt(walletAddress);
//     console.log(walletInt);
    
//     if (!currentInput.trim()) return; // Prevent empty input

//     const userMessage = { sender: "user", text: currentInput }; // Add user message
//     const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]); // Specify the type

//     setMessages((prev) => [...prev, userMessage]);
//     setCurrentInput(""); // Clear input
//     setLoading(true); // Start loading
//     setError(null);

//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: currentInput, // Send user input to the API
//           thread_id: walletInt,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const content = data.result[0]?.assistant?.messages?.content || "No content available";

//       const botMessage = { sender: "bot", text: content }; // Add bot message
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//         const errorMessage = (error as Error).message || "Unknown error occurred";
//         setMessages((prev) => [
//             ...prev,
//             { sender: "bot", text: `Error: ${errorMessage}` },
//         ]);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); // Prevent page reload
//     handleSendMessage(); // Send message
//   };
//   if (!isClient) {
//     return null; // Return null while the component is not mounted on the client
//   }
// //   const handleSubmit = (event) => {
// //     event.preventDefault(); // Prevent page reload
// //     handleSendMessage(); // Send message
// //   };

//   return (
//     <div>
//         <WalletMultiButton />
//         <div style={styles.container}>
//         <h1 style={styles.header}>Risk Manager</h1>
//         <div style={styles.chatBox}>
//             {messages.map((msg, index) => (
//             <div
//                 key={index}
//                 style={{
//                 ...styles.messageContainer,
//                 justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
//                 }}
//             >
//                 <div
//                 style={{
//                     ...styles.messageBubble,
//                     backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
//                     color: msg.sender === "user" ? "#0f5132" : "#842029",
//                 }}
//                 >
//                 {msg.text}
//                 </div>
//             </div>
//             ))}
//             {loading && (
//             <div style={styles.loading}>Bot is typing...</div>
//             )}
//         </div>
//         <form onSubmit={handleSubmit} style={styles.inputForm}>
//             <input
//             type="text"
//             value={currentInput}
//             onChange={(e) => setCurrentInput(e.target.value)}
//             placeholder="Type your message..."
//             required
//             style={styles.inputField}
//             />
//             <button type="submit" style={styles.sendButton}>
//             Send
//             </button>
//         </form>
//         {error && <div style={styles.error}>Error: {error}</div>}
//         </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "20px auto",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//   },
//   header: {
//     textAlign: "center",
//     color: "#0d6efd",
//     marginBottom: "20px",
//     fontSize: "24px",
//     fontWeight: "bold",
//   },
//   chatBox: {
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     padding: "10px",
//     height: "400px",
//     overflowY: "scroll",
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
//     wordWrap: "break-word",
//   },
//   loading: {
//     textAlign: "center",
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
//     backgroundColor: "#f1f1f1", // Light gray input box
//     color: "#333",
//   },
//   sendButton: {
//     marginLeft: "10px",
//     padding: "10px 15px",
//     borderRadius: "5px",
//     border: "none",
//     backgroundColor: "#0d6efd",
//     color: "#fff",
//     fontSize: "16px",
//     cursor: "pointer",
//   },
//   error: {
//     marginTop: "10px",
//     color: "#842029",
//     textAlign: "center",
//   },
// };

// export default Page;



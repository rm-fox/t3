
// "use client";

// import { useState } from "react";

// const Page = () => {
//   const [messages, setMessages] = useState([]); // Chat messages
//   const [currentInput, setCurrentInput] = useState(""); // User input
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const handleSendMessage = async () => {
//     if (!currentInput.trim()) return; // Prevent empty input

//     const userMessage = { sender: "user", text: currentInput }; // Add user message
//     setMessages((prev) => [...prev, userMessage]);
//     setCurrentInput(""); // Clear input
//     setLoading(true); // Start loading

//     try {
//       const response = await fetch("/api/generate", {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: currentInput, // Send user input to the API
//           thread_id: 1,
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
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: `Error: ${error.message}` },
//       ]);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent page reload
//     handleSendMessage(); // Send message
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Risk Manager</h1>
//       <div style={styles.chatBox}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               ...styles.messageContainer,
//               justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
//             }}
//           >
//             <div
//               style={{
//                 ...styles.messageBubble,
//                 backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
//                 color: msg.sender === "user" ? "#0f5132" : "#842029",
//               }}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {loading && (
//           <div style={styles.loading}>Bot is typing...</div>
//         )}
//       </div>
//       <form onSubmit={handleSubmit} style={styles.inputForm}>
//         <input
//           type="text"
//           value={currentInput}
//           onChange={(e) => setCurrentInput(e.target.value)}
//           placeholder="Type your message..."
//           required
//           style={styles.inputField}
//         />
//         <button type="submit" style={styles.sendButton}>
//           Send
//         </button>
//       </form>
//       {error && <div style={styles.error}>Error: {error}</div>}
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



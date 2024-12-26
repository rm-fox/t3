interface ChatMainProps {
    messages: { sender: string; text: string }[];
    loading: boolean;
    currentInput: string;
    setCurrentInput: (input: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    error: string | null;
  }
  
  export const ChatBoxMain = ({
    messages,
    loading,
    currentInput,
    setCurrentInput,
    onSubmit,
    error,
  }: ChatMainProps) => {
    return (
      <div
        style={{
          flex: 2,
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0d6efd",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Your Agent
        </h1>
  
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            height: "600px",
            overflowY: "scroll",
            backgroundColor: "#ffffff",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                marginBottom: "10px",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                  backgroundColor: msg.sender === "user" ? "#d1e7dd" : "#f8d7da",
                  color: msg.sender === "user" ? "#0f5132" : "#842029",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div
              style={{
                textAlign: "center",
                color: "#6c757d",
                fontStyle: "italic",
              }}
            >
              Agent is typing...
            </div>
          )}
        </div>
  
        <form onSubmit={onSubmit} style={{ display: "flex", marginTop: "10px" }}>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your message..."
            required
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#f1f1f1",
              color: "#333",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#0d6efd",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
  
        {error && (
          <div
            style={{
              marginTop: "10px",
              color: "#842029",
              textAlign: "center",
            }}
          >
            Error: {error}
          </div>
        )}
      </div>
    );
  };
  
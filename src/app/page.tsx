
"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createHash } from "crypto";

// Convert wallet address to integer
export function walletAddressToInt(walletAddress: string): number {
  const hash = createHash("sha256").update(walletAddress).digest("hex");
  const bigInt = BigInt("0x" + hash);
  const number = bigInt % BigInt(Number.MAX_SAFE_INTEGER);
  return Number(number);
}

const Page = () => {
  const { publicKey } = useWallet(); // Get the wallet public key
  const [message, setMessage] = useState(""); // State to store user input
  const [apiResponse, setApiResponse] = useState(null); // State to hold API response
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [isClient, setIsClient] = useState(false); // State to track if the component is mounted on the client

  // Use useEffect to mark that the component has mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFetch = async () => {
    if (!publicKey) {
      setError("No wallet connected");
      return;
    }

    const walletAddress = publicKey.toString();
    const walletInt = walletAddressToInt(walletAddress);
    console.log(walletInt);

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
          question: message,
          thread_id: walletInt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.result?.[0]?.assistant?.messages?.content;
      setApiResponse(content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null; // Return null while the component is not mounted on the client
  }

  return (
    <div>
      <WalletMultiButton />
      <h1>API Fetch Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <button onClick={handleFetch} style={{ marginLeft: "10px" }}>
        Send
      </button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {apiResponse && (
        <div>
          <p>Response from API:</p>
          <pre>{apiResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default Page;





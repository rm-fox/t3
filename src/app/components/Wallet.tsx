import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function CallAgent() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [isLoading, setIsLoading] = useState(false);
}
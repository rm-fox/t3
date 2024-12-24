// import React, { useState, useEffect } from "react";

// // Initial prices for each asset
// const initialPrices = {
//   BTC: 98000,
//   ETH: 2723,
//   SOL: 190,
//   ADA: 0.74,
//   DOT: 7.35,
// };

// // Function to simulate price oscillation by percentage
// const oscillatePrice = (currentPrice: number) => {
//   const randomPercentage = (Math.random() - 0.5) * 0.02; // Oscillate between -1% and +1%
//   return (currentPrice * (1 + randomPercentage)).toFixed(2);
// };

// export interface Asset {
//   name: string;
//   ticker: string;
//   riskLevel: string;
// }

// export interface SidePanelProps {
//   assets: Asset[]; // Array of traded assets
//   walletAddress?: string;
// }

// const fakeAssets: Asset[] = [
//   { name: "Bitcoin", ticker: "BTC", riskLevel: "Low" },
//   { name: "Ethereum", ticker: "ETH", riskLevel: "Medium" },
//   { name: "Solana", ticker: "SOL", riskLevel: "High" },
//   { name: "Cardano", ticker: "ADA", riskLevel: "Medium" },
//   { name: "Polkadot", ticker: "DOT", riskLevel: "Medium" },
// ];

// export const SidePanel = ({ assets = fakeAssets, walletAddress }: SidePanelProps) => {
//   const [coinPrices, setCoinPrices] = useState<{ [key: string]: string }>({
//     BTC: initialPrices.BTC.toFixed(2),
//     ETH: initialPrices.ETH.toFixed(2),
//     SOL: initialPrices.SOL.toFixed(2),
//     ADA: initialPrices.ADA.toFixed(2),
//     DOT: initialPrices.DOT.toFixed(2),
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCoinPrices((prevPrices) => {
//         const updatedPrices = { ...prevPrices };
//         // Oscillate each coin price by percentage
//         Object.keys(initialPrices).forEach((ticker) => {
//           updatedPrices[ticker] = oscillatePrice(parseFloat(prevPrices[ticker]));
//         });
//         return updatedPrices;
//       });
//     }, 1000); // Update every second

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   }, []);

//   return (
//     <div
//       style={{
//         flex: 1,
//         backgroundColor: "#f8f9fa",
//         borderRadius: "10px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "15px",
//       }}
//     >
//       {walletAddress && (
//         <div
//           style={{
//             padding: "15px",
//             backgroundColor: "#e9ecef",
//             borderRadius: "8px",
//           }}
//         >
//           <h3
//             style={{
//               margin: "0 0 10px 0",
//               fontSize: "16px",
//               color: "#495057",
//             }}
//           >
//             Connected Wallet
//           </h3>
//           <p
//             style={{
//               margin: 0,
//               fontSize: "14px",
//               wordBreak: "break-all",
//               color: "#6c757d",
//             }}
//           >
//             {walletAddress}
//           </p>
//         </div>
//       )}

//       <div>
//         <h3
//           style={{
//             marginBottom: "15px",
//             fontSize: "18px",
//             color: "#495057",
//             textAlign: "center",
//           }}
//         >
//           Traded Assets
//         </h3>
//         {assets.length > 0 ? (
//           assets.map((asset, index) => (
//             <div
//               key={index}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "10px",
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//                 backgroundColor: "#ffffff",
//                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                 <div
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     borderRadius: "50%",
//                     backgroundColor: "#f8f9fa",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
//                   }}
//                 >
//                   <span
//                     style={{
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       color: "#495057",
//                     }}
//                   >
//                     {asset.ticker}
//                   </span>
//                 </div>
//                 <div>
//                   <p
//                     style={{
//                       margin: 0,
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       color: "#495057",
//                     }}
//                   >
//                     {asset.name}
//                   </p>
//                   <p
//                     style={{
//                       margin: 0,
//                       fontSize: "12px",
//                       color: "#6c757d",
//                     }}
//                   >
//                     Risk: {asset.riskLevel}
//                   </p>
//                 </div>
//               </div>

//               {/* Displaying the current price of the coin */}
//               <div
//                 style={{
//                   fontSize: "14px",
//                   fontWeight: "bold",
//                   color: "#495057",
//                 }}
//               >
//                 ${coinPrices[asset.ticker] || "--"}
//               </div>

//               <button
//                 style={{
//                   padding: "8px 12px",
//                   fontSize: "14px",
//                   backgroundColor: "#6c63ff",
//                   color: "#ffffff",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//                 }}
//                 onClick={() => alert(`Trade ${asset.ticker}`)}
//               >
//                 Trade
//               </button>
//             </div>
//           ))
//         ) : (
//           <p
//             style={{
//               textAlign: "center",
//               color: "#6c757d",
//               fontSize: "14px",
//             }}
//           >
//             No traded assets to display.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SidePanel;


import React, { useState, useEffect } from "react";

// Initial prices for each asset
const initialPrices = {
  BTC: 98000,
  ETH: 2723,
  SOL: 190,
  ADA: 0.74,
  DOT: 7.35,
};

// Function to simulate price oscillation by percentage
const oscillatePrice = (currentPrice: number) => {
  const randomPercentage = (Math.random() - 0.5) * 0.02; // Oscillate between -1% and +1%
  return (currentPrice * (1 + randomPercentage)).toFixed(2);
};

export interface Asset {
  name: string;
  ticker: string;
  riskLevel: string;
}

export interface SidePanelProps {
  assets: Asset[]; // Array of traded assets
  walletAddress?: string;
  onTrade: (ticker: string) => void; // New prop for handling the trade action
}

const fakeAssets: Asset[] = [
  { name: "Bitcoin", ticker: "BTC", riskLevel: "Low" },
  { name: "Ethereum", ticker: "ETH", riskLevel: "Medium" },
  { name: "Solana", ticker: "SOL", riskLevel: "High" },
  { name: "Cardano", ticker: "ADA", riskLevel: "Medium" },
  { name: "Polkadot", ticker: "DOT", riskLevel: "Medium" },
];

export const SidePanel = ({ assets = fakeAssets, walletAddress, onTrade }: SidePanelProps) => {
  const [coinPrices, setCoinPrices] = useState<{ [key: string]: string }>({
    BTC: initialPrices.BTC.toFixed(2),
    ETH: initialPrices.ETH.toFixed(2),
    SOL: initialPrices.SOL.toFixed(2),
    ADA: initialPrices.ADA.toFixed(2),
    DOT: initialPrices.DOT.toFixed(2),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoinPrices((prevPrices) => {
        const updatedPrices = { ...prevPrices };
        // Oscillate each coin price by percentage
        Object.keys(initialPrices).forEach((ticker) => {
          updatedPrices[ticker] = oscillatePrice(parseFloat(prevPrices[ticker]));
        });
        return updatedPrices;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {walletAddress && (
        <div
          style={{
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

      <div>
        <h3
          style={{
            marginBottom: "15px",
            fontSize: "18px",
            color: "#495057",
            textAlign: "center",
          }}
        >
          Suggested Assets
        </h3>
        {assets.length > 0 ? (
          assets.map((asset, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#495057",
                    }}
                  >
                    {asset.ticker}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#495057",
                    }}
                  >
                    {asset.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#6c757d",
                    }}
                  >
                    Risk: {asset.riskLevel}
                  </p>
                </div>
              </div>

              {/* Displaying the current price of the coin */}
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#495057",
                }}
              >
                ${coinPrices[asset.ticker] || "--"}
              </div>

              <button
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "#6c63ff",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => onTrade(asset.ticker)} // Call onTrade when button is clicked
              >
                Trade
              </button>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            No traded assets to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default SidePanel;

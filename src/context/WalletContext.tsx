"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type WalletContextType = {
  walletAddress: string;
  connectWallet: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);

export function WalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        connectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWalletContext must be used inside WalletProvider"
    );
  }

  return context;
}
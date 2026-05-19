import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    return {
      address: accounts[0],
      provider,
      signer,
    };
  } catch (error) {
    console.error("Wallet connection failed:", error);
    return null;
  }
}
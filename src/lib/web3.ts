import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function getEthereumProvider() {
  if (!window.ethereum) {
    throw new Error(
      "MetaMask wallet not detected"
    );
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return new ethers.BrowserProvider(
    window.ethereum
  );
}
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
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
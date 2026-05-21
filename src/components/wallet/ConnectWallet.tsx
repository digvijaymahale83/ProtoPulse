"use client";

import { useWalletContext } from "@/context/WalletContext";

export default function ConnectWallet() {
  const { walletAddress, connectWallet } =
    useWalletContext();

  return (
    <div className="flex flex-col items-center gap-4">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-white">
          Connected:
          <span className="ml-2 text-blue-400">
            {walletAddress.slice(0, 6)}...
            {walletAddress.slice(-4)}
          </span>
        </div>
      )}
    </div>
  );
}
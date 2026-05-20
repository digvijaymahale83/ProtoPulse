"use client";

import { useEffect, useState } from "react";
import CertificatePreview from "./CertificatePreview";
import {
  generateCertificateMetadata,
} from "@/services/certificate";
import { useWalletContext } from "@/context/WalletContext";
import {
  switchToBaseSepolia
} from "@/services/network";
import {
  getEthereumProvider
} from "@/lib/web3";
import { mintNFT } from "@/services/contract";
import { ethers } from "ethers";


export default function CertificateForm() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    walletAddress: "",
    issueDate: "",
    description: "",
  });


  const { walletAddress } = useWalletContext();

  useEffect(() => {
    if (walletAddress) {
      setFormData((prev) => ({
        ...prev,
        walletAddress,
      }));
    }
  }, [walletAddress]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMint = async () => {
    try {

      const finalWalletAddress =
        walletAddress || formData.walletAddress;

      if (!ethers.isAddress(finalWalletAddress)) {
        alert("Invalid wallet address");
        return;
}
      if (
        !formData.studentName ||
        !formData.courseName ||
        !finalWalletAddress ||
        !formData.issueDate
      ) {
        alert("Please fill all required fields");
        return;
      }

      setLoading(true);

      await switchToBaseSepolia();

      const provider = await getEthereumProvider();
      const signer = await provider.getSigner();

      const address = await signer.getAddress();

      console.log("Connected Wallet:", address);

      //metadata
      const metadata = generateCertificateMetadata(formData);

      console.log("Metadata:", metadata);

      // REAL MINT (tokenURI should come from IPFS in real project)
      //store JSON inside string (temporary dev method for hack)
      const tokenURI = `data:application/json;base64,${btoa(
        JSON.stringify(metadata)
      )}`;

      const result = await mintNFT(
        signer,
        finalWalletAddress,
        tokenURI
      );

      console.log("Tx Hash:", result.txHash);

      setTxHash(result.txHash);

      setMintSuccess(true);

      alert(`NFT Minted 🚀\nTx: ${result.txHash}`);

    } catch (error: any) {
      console.error(error);

      const message =
        error?.reason ||
        error?.message ||
        "Mint failed";

      setError(message);
    } finally {
      setError("");
      setMintSuccess(false);
      setLoading(false);
    }
  };

  return (
    <section
      id="certificate"
      className="min-h-screen bg-zinc-950 px-6 py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">

        {/* FORM */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          <h2 className="mb-8 text-3xl font-bold">
            Generate NFT Certificate
          </h2>

          <div className="space-y-5">

            <input
              disabled={loading}
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              disabled={loading}
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              disabled={loading}
              type="text"
              name="walletAddress"
              placeholder="Wallet Address"
              value={walletAddress || formData.walletAddress}
              readOnly={!!walletAddress}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              disabled={loading}
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <textarea
              disabled={loading}
              name="description"
              placeholder="Certificate Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <button
              onClick={handleMint}
              disabled={loading}
              className="w-full rounded-2xl bg-blue-500 py-4 font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing Blockchain Transaction..." : "Mint NFT Certificate"}
            </button>

            {mintSuccess && (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">

                <h3 className="text-lg font-bold text-green-400">
                  NFT Minted Successfully 🚀
                </h3>

                <p className="mt-2 break-all text-sm text-zinc-300">
                  Transaction Hash:
                </p>

                <p className="mt-1 break-all text-xs text-blue-400">
                  {txHash}
                </p>

                <a
                  href={`https://sepolia.basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-xl bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  View on BaseScan
                </a>

              </div>
            )}

            {error && (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}

          </div>
        </div>

        {/* PREVIEW */}

        <CertificatePreview formData={formData} />

      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import CertificatePreview from "./CertificatePreview";
import {
  generateCertificateMetadata,
} from "@/services/certificate";
import { useWalletContext } from "@/context/WalletContext";
import { switchToBaseSepolia } from "@/services/network";
import { getEthereumProvider } from "@/lib/web3";
import { sendGaslessTransaction } from "@/services/ugf";
import { ethers } from "ethers";


export default function CertificateForm() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [mintSuccess, setMintSuccess] = useState(false);

  const today = new Date()
  .toISOString()
  .split("T")[0];

  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    walletAddress: "",
    issueDate: today,
    description: "",
  });


  const { walletAddress } = useWalletContext();

  const isValidName = (name: string) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    // Student Name Validation
    if (name === "studentName") {

      if (
        value !== "" &&
        !isValidName(value)
      ) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMint = async () => {
    try {

      setError("");
      setMintSuccess(false);

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

      const CONTRACT_ADDRESS =
        "0x9Cd969bC84336E2e4d8b783Ed2aCC0D7C2eeDB5E";

      const ABI = [
        "function mint(address to, string tokenURI) public returns (uint256)"
      ];

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
      );


      const txData =
        contract.interface.encodeFunctionData(
          "mint",
          [
            finalWalletAddress,
            tokenURI
          ]
        );

      const result =
        await sendGaslessTransaction({
          wallet: signer,
          signer,
          from: address,

          contractAddress: CONTRACT_ADDRESS,

          data: txData,
        });

      console.log("Tx Hash:", result.userTxHash);

      setTxHash(result.userTxHash);

      setMintSuccess(true);

      alert(`NFT Minted 🚀\nTx: ${result.userTxHash}`);

    } catch (error: unknown) {
      console.error(error);

      let message = "Mint failed";

      if (error instanceof Error) {

        if (
          error.message.includes("user rejected") ||
          error.message.includes("ACTION_REJECTED")
        ) {

          message =
            "Transaction cancelled by user.";

        } else if (
          error.message.includes("TYI_MOCK_USD")
        ) {

          message =
            "You need TYI_MOCK_USD on Base Sepolia testnet.";

        } else {

          message = error.message;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    } 
  };

  return (
    <section
      id="certificate"
      className="min-h-screen bg-zinc-950 px-6 py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 lg:grid-cols-2">

        {/* FORM */}

        <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
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
              maxLength={50}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-zinc-400">
              {formData.studentName.length}/50
            </p>

            <input
              disabled={loading}
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              maxLength={80}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-zinc-400">
              {formData.courseName.length}/80
            </p>

            <input
              disabled={loading}
              readOnly
              type="text"
              name="walletAddress"
              placeholder="Wallet Address"
              value={walletAddress || formData.walletAddress}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              disabled={loading}
              readOnly
              type="date"
              name="issueDate"
              value={formData.issueDate}
              max={today}
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
               maxLength={250}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <p className="mt-1 text-right text-xs text-zinc-400">
              {formData.description.length}/250
            </p>

            <button
              onClick={handleMint}
              disabled={loading}
              className="w-full rounded-2xl bg-blue-500 py-4 font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing Blockchain Transaction..." : "Mint NFT Certificate"}
            </button>

            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">

              <h3 className="text-lg font-bold text-yellow-400">
                Need Mock USDC for UGF x402
              </h3>

              <p className="mt-2 text-sm text-zinc-300">
                UGF gasless execution uses Mock USDC on Base Sepolia testnet.
              </p>

              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-300">
                <li>Open UGF Faucet</li>
                <li>Connect MetaMask</li>
                <li>Switch network to Base Sepolia</li>
                <li>Request Mock USDC</li>
                <li>(Optional) Request test ETH</li>
                <li>Wait 20–60 seconds</li>
                <li>Retry mint transaction</li>
              </ol>

              <a
                href="https://universalgasframework.com/faucets"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
              >
                Open UGF Faucet
              </a>

            </div>

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
                  ❌ {error}
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
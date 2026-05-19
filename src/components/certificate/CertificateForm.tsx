"use client";

import { useEffect, useState } from "react";
import CertificatePreview from "./CertificatePreview";
import {
  generateCertificateMetadata,
} from "@/services/certificate";
import { useWalletContext } from "@/context/WalletContext";
import { prepareMintPayload } from "@/services/mint";
import {
  switchToBaseSepolia
} from "@/services/network";
import {
  getEthereumProvider
} from "@/lib/web3";


export default function CertificateForm() {
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
    const finalWalletAddress =
      walletAddress || formData.walletAddress;

    if (
      !formData.studentName ||
      !formData.courseName ||
      !finalWalletAddress ||
      !formData.issueDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Generating NFT metadata...");

    await switchToBaseSepolia();

    const provider =
      await getEthereumProvider();

    const signer =
      await provider.getSigner();

    const address =
      await signer.getAddress();

    console.log(
      "Connected Wallet:",
      address
    );

    const payload = await prepareMintPayload({
      studentName: formData.studentName,
      courseName: formData.courseName,
      walletAddress: finalWalletAddress,
      issueDate: formData.issueDate,
      description: formData.description,
    });

    console.log("Blockchain Mint Payload:", payload);

    console.log("Preparing blockchain mint payload...");

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    alert("NFT Mint Payload Ready 🚀");
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
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={formData.studentName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              type="text"
              name="walletAddress"
              placeholder="Wallet Address"
              value={walletAddress || formData.walletAddress}
              readOnly={!!walletAddress}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <textarea
              name="description"
              placeholder="Certificate Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <button
              onClick={handleMint}
              className="w-full rounded-2xl bg-blue-500 py-4 font-semibold transition hover:bg-blue-600"
            >
              Mint NFT Certificate
            </button>

          </div>
        </div>

        {/* PREVIEW */}

        <CertificatePreview formData={formData} />

      </div>
    </section>
  );
}
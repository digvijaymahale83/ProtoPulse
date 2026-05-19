"use client";

import { useState } from "react";
import CertificatePreview from "./CertificatePreview";

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    courseName: "",
    walletAddress: "",
    issueDate: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
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
              value={formData.walletAddress}
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

            <button className="w-full rounded-2xl bg-blue-500 py-4 font-semibold transition hover:bg-blue-600">
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
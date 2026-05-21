"use client";

import { motion } from "framer-motion";

const steps = [
  "Connect Wallet",
  "Fill Certificate Form",
  "Generate NFT Certificate",
  "Certificate Minted on Blockchain",
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            How{" "}
            <span className="inline-block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              It
            </span>{" "}
            Works
          </h2>

          <p className="mt-4 text-gray-400">
            Simple and fast certificate generation process.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
            >
              {/* Step Number */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-xl font-bold">
                {index + 1}
              </div>

              {/* Step Text */}
              <h3 className="mt-6 text-lg font-semibold">
                {step}
              </h3>

              {/* Arrow */}
              {index !== steps.length - 1 && (
                <div className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-3xl text-blue-500 md:block">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

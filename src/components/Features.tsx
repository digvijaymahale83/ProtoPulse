"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Gasless Transactions",
    description: "Users can mint certificates without paying ETH gas fees.",
  },
  {
    title: "NFT Certificates",
    description: "Certificates are stored securely on blockchain as NFTs.",
  },
  {
    title: "Secure Wallet",
    description: "MetaMask wallet integration for authentication and security.",
  },
  {
    title: "Instant Minting",
    description: "Generate blockchain certificates within seconds.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-zinc-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Powerful {" "}
            <span className="inline-block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="mt-4 text-gray-400">
            Everything needed to create modern blockchain certificates.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-blue-500"
            >
              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
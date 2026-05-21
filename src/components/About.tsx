"use client";

import { motion } from "framer-motion";

const aboutCards = [
  {
    title: "NFT Certificates",
    description:
      "Certificates are securely minted as NFTs on blockchain for transparent ownership and verification.",
  },
  {
    title: "UGF Integration",
    description:
      "Universal Gas Framework enables gasless and cross-chain transaction execution using stablecoin payments.",
  },
  {
    title: "Web3 Security",
    description:
      "Immutable blockchain verification reduces fraud and ensures trusted certification records.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400">
            About Platform
          </p>

          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            Next Generation
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              NFT Certificate Platform
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            CertiChain is a blockchain-powered NFT certificate platform
            built using Base Sepolia and Universal Gas Framework (UGF).
            It enables secure certificate minting, decentralized ownership
            verification, and seamless gasless blockchain transactions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 backdrop-blur-xl transition duration-300 hover:border-blue-500/50"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-400/0 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10">

                {/* Number */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl font-bold text-blue-400">
                  0{index + 1}
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-5 leading-8 text-zinc-400">
                  {card.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

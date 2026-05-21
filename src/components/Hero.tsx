"use client";

import { motion } from "framer-motion";
import ConnectWallet from "./wallet/ConnectWallet";

export default function Hero() {


  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl text-center"
      >
        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          Mint Blockchain
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {" "}
            Certificates
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 md:text-xl">
          Generate secure NFT certificates with gasless transactions
          powered by Universal Gas Framework.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ConnectWallet />

          <button
            onClick={() => {
              document
                .getElementById("certificate")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="rounded-2xl border border-zinc-700 px-8 py-4 font-semibold text-white transition hover:border-blue-500"
          >
            Generate Certificate
          </button>
        </div>
      </motion.div>
    </section>
  );
}
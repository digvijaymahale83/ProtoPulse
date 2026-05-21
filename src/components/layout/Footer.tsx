"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="border-t border-zinc-800 bg-zinc-950 px-6 py-10 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold">
            Certi<span className="text-blue-500">Chain</span>
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Blockchain-powered NFT certificate platform.
          </p>
        </div>

        {/* Center */}
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-white">
            How It Works
          </a>

          <a href="#" className="hover:text-white">
            GitHub
          </a>
        </div>

        {/* Right */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          <p>Built for  HackWithMumbai 3.0 🚀</p>
          <p className="mt-1">
            © 2026 CertiChain Team
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
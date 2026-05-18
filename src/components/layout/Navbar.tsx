"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          Certi<span className="text-blue-500">Chain</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            About
          </a>

          <button className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-zinc-800 bg-black md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            <a
              href="#features"
              className="text-gray-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-gray-300 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#about"
              className="text-gray-300 transition hover:text-white"
            >
              About
            </a>

            <button className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
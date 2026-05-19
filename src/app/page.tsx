import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/layout/Footer";

import CertificateForm from "@/components/certificate/CertificateForm";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <CertificateForm />

      <Footer />
    </main>
  );
}
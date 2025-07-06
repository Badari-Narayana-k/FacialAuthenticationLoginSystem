'use client';

import FloatingGlobe from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* 🌐 Animated Globe */}
      <FloatingGlobe />

      {/* 💡 Content on top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white/10 backdrop-blur-md rounded-xl p-10 shadow-xl border border-white/30"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-200 mb-4 text-center drop-shadow-md">
          CloudAuth Secure Portal
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm sm:text-base">
          Facial recognition login using <span className="text-blue-400 font-medium">AWS Rekognition, Lambda, S3, and DynamoDB</span> — powered by <span className="text-blue-400 font-medium">Next.js & Tailwind</span>.
        </p>

        <div className="flex justify-center gap-6">
          <Link href="/login">
            <Button variant="default" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 shadow-md">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="px-6 py-2 text-black border-white hover:bg-white hover:text-black transition">
              Register
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

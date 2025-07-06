'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white flex items-center justify-center px-4">

      {/* 🔵 Animated Blobs Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-30"
          animate={{ x: [0, 300, -300, 0], y: [0, -200, 200, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-2xl opacity-30"
          animate={{ x: [0, -200, 200, 0], y: [0, 150, -150, 0], rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        />
      </div>

      {/* 🔮 Main Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl text-center max-w-2xl w-full transform transition-all duration-500 hover:scale-[1.03]"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-extrabold text-white drop-shadow mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          🚀 Welcome, Cloud Hero!
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          You’ve securely entered the quantum dashboard via AWS + Rekognition.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Button
            onClick={() => router.push('/view-insights')}
            className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-xl hover:scale-105 transition"
          >
            View Insights
          </Button>

          <Button
            onClick={() => router.push('/manage-profile')}
            variant="outline"
            className="border-white text-black hover:bg-white/10 hover:scale-105 transition"
          >
            Manage Profile
          </Button>
        </motion.div>
      </motion.div>

      {/* ✨ Stars Overlay */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-10 pointer-events-none -z-10" />
    </div>
  );
}

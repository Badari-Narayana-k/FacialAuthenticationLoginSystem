'use client';

import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const barData = {
  labels: ['Login Success', 'Login Failed', 'New Registrations'],
  datasets: [
    {
      label: 'User Stats',
      data: [23, 5, 12],
      backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
      borderRadius: 8,
    },
  ],
};

const pieData = {
  labels: ['AWS Rekognition', 'Webcam Uploads', 'File Uploads'],
  datasets: [
    {
      label: 'Usage Split',
      data: [45, 35, 20],
      backgroundColor: ['#6366f1', '#f59e0b', '#84cc16'],
      borderWidth: 1,
    },
  ],
};

export default function ViewInsightsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 px-6 py-10 text-white overflow-hidden">
      
      {/* 🔮 Background Blobs */}
      <motion.div
        className="absolute w-[450px] h-[450px] bg-pink-500 rounded-full opacity-20 filter blur-3xl -top-40 -left-40"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full opacity-20 filter blur-2xl -bottom-40 -right-40"
        animate={{ x: [0, -120, 120, 0], y: [0, 80, -80, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'easeInOut' }}
      />

      {/* Page Title */}
      <motion.h1
        className="text-4xl font-extrabold text-center mb-12 drop-shadow"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📊 User Insights & Analytics
      </motion.h1>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto z-10 relative">

        <motion.div
          className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">📈 Login Activity</h2>
          <Bar data={barData} options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: { ticks: { color: 'white' } },
              y: { ticks: { color: 'white' }, beginAtZero: true },
            },
          }} />
        </motion.div>

        <motion.div
          className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">🧠 Feature Usage</h2>
          <Pie data={pieData} options={{
            responsive: true,
            plugins: {
              legend: {
                labels: { color: 'white' },
              },
            },
          }} />
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="text-white/70 text-lg">
          Want deeper insights or export analytics?
        </p>
        <button className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition">
          Export Report
        </button>
      </motion.div>

      {/* 🌟 Starry Overlay */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-10 pointer-events-none -z-10" />
    </div>
  );
}

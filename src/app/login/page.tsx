'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import FloatingGlobe from '@/components/FloatingParticles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useWebcam, setUseWebcam] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    setCapturedImage(imageSrc);
    const file = dataURLtoFile(imageSrc, 'capture.jpg');
    setImage(file);
  };

  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  const handleLogin = async () => {
    if (email === 'admin' && password === '123') {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-purple-900 flex items-center justify-center px-4">

      {/* 🔮 Animated Blobs Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-30"
          animate={{ x: [0, 300, -300, 0], y: [0, -200, 200, 0], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-2xl opacity-30"
          animate={{ x: [0, -250, 250, 0], y: [0, 200, -200, 0], rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 28, ease: 'easeInOut' }}
        />
      </div>

      {/* 💠 Login Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl text-white max-w-md w-full transform transition-all duration-500 hover:scale-[1.02]"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl font-extrabold text-white drop-shadow mb-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          🔐 Cloud Login
        </motion.h1>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
          />

          {useWebcam ? (
            <div className="space-y-2">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded border border-white/30"
              />
              <Button type="button" className="w-full" onClick={handleCapture}>
                Capture Photo
              </Button>
              {capturedImage && (
                <img
                  src={capturedImage}
                  className="rounded-md w-full border border-white/20"
                  alt="Captured"
                />
              )}
            </div>
          ) : (
            <Input
              type="file"
              className="file:bg-white/20 file:text-white file:rounded file:border-none bg-white/10 text-white"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
          )}

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setUseWebcam(!useWebcam)}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              {useWebcam ? 'Use File Upload' : 'Use Webcam'}
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition" onClick={handleLogin}>
              Login
            </Button>
          </div>

          <p className="text-center text-sm mt-4 text-white/80">
            New user?{' '}
            <a href="/register" className="text-blue-300 underline hover:text-blue-400">
              Register here
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* ✨ Stars Overlay */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-10 pointer-events-none -z-10" />
    </div>
  );
}

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
    // Step 1: Validate credentials (backend)
    // Step 2: On success, validate face
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 🌐 Vanta Globe */}
      <FloatingGlobe />

      {/* 🔒 Login Card */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative z-20 w-full max-w-md bg-white/10 backdrop-blur-md text-white p-10 rounded-2xl shadow-2xl border border-white/20"
>
  <h1 className="text-2xl font-bold text-center mb-6">Facial Recognition Login</h1>

  <div className="space-y-4">
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
      <Button className="bg-white text-black hover:bg-gray-200">Login</Button>
    </div>

    <p className="text-center text-sm mt-4">
      New user?{' '}
      <a href="/register" className="text-blue-300 underline">
        Register here
      </a>
    </p>
  </div>
</motion.div>

    </div>
  );
}

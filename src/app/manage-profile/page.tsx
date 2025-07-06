'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, UploadCloud } from 'lucide-react';

export default function ManageProfilePage() {
  const [profile, setProfile] = useState({
    firstName: 'Cloud',
    lastName: 'Hero',
    email: 'admin@cloudauth.ai',
    password: 'supersecure',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleSave = () => {
    alert('✅ Profile updated successfully!');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-950 flex items-center justify-center px-6 py-10 text-white">

      {/* 💫 Animated Background Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-25 top-0 left-0 -z-10"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-500 rounded-full blur-2xl opacity-25 bottom-0 right-0 -z-10"
        animate={{ x: [0, -80, 80, 0], y: [0, 80, -80, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
      />

      {/* 🔮 Profile Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-xl space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Profile Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                {profile.firstName.charAt(0)}
              </div>
            )}
          </div>
          <label className="mt-2 text-sm cursor-pointer flex gap-1 items-center hover:underline">
            <UploadCloud className="w-4 h-4" />
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            placeholder="First Name"
            value={profile.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="bg-white/10 text-white placeholder-white/60"
          />
          <Input
            placeholder="Last Name"
            value={profile.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="bg-white/10 text-white placeholder-white/60"
          />
          <Input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-white/10 text-white placeholder-white/60"
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={profile.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="bg-white/10 text-white placeholder-white/60 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition mt-4"
        >
          Save Changes
        </Button>
      </motion.div>

      {/* ✨ Stars Background Overlay */}
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-10 pointer-events-none -z-20" />
    </div>
  );
}

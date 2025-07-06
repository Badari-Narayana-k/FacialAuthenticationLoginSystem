'use client';

import { useState ,useRef} from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useWebcam, setUseWebcam] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const captureImage = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const file = dataURLtoFile(imageSrc, `${email.replace(/[@.]/g, '_')}_face.jpg`);
    setImage(file);
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !image) {
      toast.error('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('file', image);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (result.success) toast.success('Registered successfully');
    else toast.error(result.message || 'Registration failed');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Profile Photo</Label>
          <Button type="button" variant="ghost" onClick={() => setUseWebcam(!useWebcam)}>
            {useWebcam ? 'Use File Upload' : 'Use Webcam'}
          </Button>
        </div>

        {useWebcam ? (
          <>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-full rounded-md" />
            <Button type="button" className="w-full mt-2" onClick={captureImage}>
              Capture Image
            </Button>
          </>
        ) : (
          <Input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} />
        )}
      </div>

      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}

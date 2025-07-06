'use client';

import { useState } from 'react';
import AWS from 'aws-sdk';
import { toast } from 'react-toastify';
import { Button } from './ui/button';

AWS.config.update({
  accessKeyId: '', // your access key
  secretAccessKey: '', // your secret key
  region: 'us-east-1',
});

const s3 = new AWS.S3();

export default function S3Uploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return toast.error('No file selected');

    setUploading(true);

    const params: AWS.S3.PutObjectRequest = {
      Bucket: 'employees646',
      Key: selectedFile.name,
      Body: selectedFile,
      ACL: 'public-read',
    };

    try {
      const data = await s3.upload(params).promise();
      toast.success('Uploaded successfully');
      console.log('Upload success:', data);
    } catch (err) {
      toast.error('Upload failed');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={e => setSelectedFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleUpload} disabled={uploading} className="w-full">
        {uploading ? 'Uploading...' : 'Upload to Register'}
      </Button>
    </div>
  );
}

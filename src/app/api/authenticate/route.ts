import { NextRequest, NextResponse } from 'next/server';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

const s3 = new S3({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

async function parseForm(req: NextRequest): Promise<{
  fields: formidable.Fields;
  files: formidable.Files;
}> {
  const form = formidable.default({ multiples: false, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const { fields, files } = await parseForm(req);

    const email = fields.email?.toString();
    const password = fields.password?.toString();

    if (!email || !password || !files.file) {
      return NextResponse.json({ success: false, message: 'Missing form data' }, { status: 400 });
    }

    const file = Array.isArray(files.file)
      ? files.file[0] as formidable.File
      : files.file as formidable.File;

    const fileContent = await fs.readFile(file.filepath);
    const objectKey = `${uuidv4()}.jpg`;

    // Upload to S3
    await s3.upload({
      Bucket: 'visitors646',
      Key: objectKey,
      Body: fileContent,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    }).promise();

    // Call Lambda API for Rekognition face match
    const lambdaRes = await fetch(
      `https://qyxzhf5pcg.execute-api.us-east-1.amazonaws.com/dev/employee?objectKey=${objectKey}`
    );

    const result = await lambdaRes.json();

    if (result?.Message === 'Success' && result?.email === email) {
      return NextResponse.json({ success: true, message: 'Authentication successful' });
    } else {
      return NextResponse.json({ success: false, message: 'Face match failed or user not found' });
    }
  } catch (error) {
    console.error('Upload/authentication error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

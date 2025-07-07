# 🔐 CloudAuth - Facial Recognition Auth Portal

A futuristic facial authentication portal built using **Next.js 15 (App Router)**, **AWS Rekognition**, **S3**, **Lambda**, and **TailwindCSS**. The app supports secure registration and login using facial images captured via webcam or file upload.

---

## ✨ Features

- 🌐 **Modern UI** with glassmorphism & animated visuals
- 📷 Webcam & file-based face capture
- 🧠 Facial recognition login via **AWS Rekognition**
- ☁️ S3 upload via Next.js API route
- 🧬 Lambda function trigger for indexing/searching faces
- 🔒 Password + Face dual authentication
- ⚛️ Animated & responsive **Next.js App Router** structure
- 📊 Insights dashboard, profile management, and more

---

## 📁 Folder Structure

.
├── app/
│ ├── login/ # Login page
│ ├── register/ # Register page
│ ├── dashboard/ # After login
│ ├── manage-profile/ # User profile page
│ ├── view-insights/ # Data/Analytics page
│ ├── api/
│ │ ├── login/route.ts # Upload + Rekognition (login)
│ │ └── register/route.ts # Upload + Rekognition (register)
│
├── components/
│ ├── FloatingParticles.tsx # Animated globe or background
│ ├── ui/ # UI components like button, input
│
├── public/
│ └── stars.svg # Background stars
│
├── styles/
│ └── globals.css # Tailwind + custom styles
│
├── types/
├── .env.local # AWS credentials
└── README.md



---

## 🛠️ Tech Stack

| Technology       | Purpose                            |
|------------------|-------------------------------------|
| **Next.js 15**    | Frontend framework (App Router)     |
| **TailwindCSS**   | Utility-first styling               |
| **AWS S3**        | Image storage                       |
| **AWS Lambda**    | Face indexing/search logic          |
| **AWS Rekognition** | Face comparison & recognition     |
| **Framer Motion** | Animations                          |
| **React Webcam**  | Capturing webcam image              |
| **UUID**          | For unique image names              |
| **Formidable**    | Multipart form handling             |

---

## 🔐 AWS Setup

1. **S3 Bucket**: `visitors646`
   - Enable public read (for demo)
   - Allow CORS if using preview

2. **AWS Rekognition Collection**
   - Name: e.g., `visitors-faces`
   - Index faces for registered users
   - Search faces during login

3. **Lambda Functions**:
   - Register Function:
     - Triggers face indexing from S3 image
   - Login Function:
     - Triggers face comparison from S3 image
   - Both invoked from API Gateway URLs

---

## 🔧 Environment Setup

### 1. Clone & Install

```bash
git clone https://github.com/your-username/cloud-auth-portal.git
cd cloud-auth-portal
npm install
```
### 2. Environment Variables
Create a .env.local file:
```
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

### 3. Dev Server
```
npm run dev
```

### Access: http://localhost:3000


## 📸 Functional Flow
### ✅ Register Flow
  - User provides name, email, password + image/webcam
  - Image uploads to S3

  - Lambda is triggered to index face in Rekognition

### 🔐 Login Flow
  - User enters email + password + image/webcam

  - Image uploads to S3

  - Lambda is triggered to search face in Rekognition

  - If match found → allow login


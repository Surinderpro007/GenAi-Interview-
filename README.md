# 🤖 GenAI Interview Prep

An AI-powered interview preparation platform that analyzes your resume and job description to create a fully personalized interview plan — powered by Google Gemini AI.

🔗 **Live Demo:** [gen-ai-interview.vercel.app](https://gen-ai-interview.vercel.app)

---

## 🎯 The Problem It Solves

Most job seekers struggle with:
- Not knowing what interview questions to expect
- Unclear skill gaps compared to job requirements
- No structured preparation plan
- Wasting hours on generic prep content

**GenAI Interview Prep solves all of this in seconds.**

---

## ✨ Features

- 📄 **Resume Analysis** — Upload your PDF resume for AI analysis
- 🎯 **Match Score** — See how well you match the job (0–100%)
- ❓ **Technical Questions** — AI-generated questions likely to be asked
- 🧠 **Behavioral Questions** — Soft skill questions tailored to the role
- 📊 **Skill Gap Analysis** — Know exactly what skills you're missing
- 📅 **Day-wise Prep Plan** — A structured plan to prepare efficiently
- 📁 **Report History** — Access all your past interview reports
- 🔐 **Auth System** — Secure register/login with JWT

---

## 🛠️ Tech Stack

### Frontend
- **React** — UI framework
- **Axios** — API calls
- **React Router** — Navigation
- **Vercel** — Deployment

### Backend
- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — Database
- **JWT** — Authentication
- **Multer** — File uploads
- **pdf-parse** — PDF text extraction
- **Google Gemini API** — AI report generation
- **Railway** — Deployment

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB URI
- Google Gemini API Key

### Clone the repo
```bash
git clone https://github.com/Surinderpro007/GenAi-Interview-.git
cd GenAi-Interview-
```

### Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
FRONTEND_URL=http://localhost:5173
PORT=3000
```

Start the backend:
```bash
node server.js
```

### Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
GenAi-Interview-/
├── Backend/
│   ├── src/
│   │   ├── config/         # Database connection
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Auth & file middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # AI service (Gemini)
│   │   └── app.js          # Express app setup
│   └── server.js           # Entry point
│
└── Frontend/
    └── src/
        └── features/
            ├── auth/       # Login, Register, Auth context
            └── interview/  # Interview generation & reports
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/logout` | Logout user |
| GET | `/api/auth/get-me` | Get current user |

### Interview
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/interview` | Generate interview report |
| GET | `/api/interview` | Get all reports |
| GET | `/api/interview/report/:id` | Get report by ID |

---

## 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Railway](https://railway.app) |
| Database | [MongoDB Atlas](https://mongodb.com/atlas) |

---

## 👤 Author

**Surinder** — [@Surinderpro007](https://github.com/Surinderpro007)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

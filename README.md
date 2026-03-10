# 🌱 Eco Innovation Platform

A full-stack web application that enables users to **share, explore, and manage eco-friendly ideas** aimed at solving environmental challenges.
The platform encourages innovation in sustainability by providing a collaborative space for green initiatives.

---

# 🚀 Features

* 🔐 User Authentication (Register / Login)
* 🌍 Submit eco-friendly innovation ideas
* 📊 Personal dashboard for managing ideas
* 🛡 Protected routes using authentication
* 💡 Organized idea management system
* 🎨 Responsive and modern UI

---

# 🏗️ Project Architecture

```
eco-innovation-platform
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── auth/               # Authentication logic
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # App pages
│   │   ├── services/           # API requests
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── controllers/            # Business logic
│   ├── middleware/             # Authentication middleware
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API endpoints
│   └── index.js
│
└── README.md
```

---

# 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* dotenv

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```
git clone https://github.com/amitrajstm/eco-innovation-platform.git
cd eco-innovation-platform
```

---

# Backend Setup

```
cd server
npm install
```

Create a `.env` file inside `server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

or

```
node index.js
```

---

# Frontend Setup

Open a new terminal:

```
cd client
npm install
```

Create `.env` inside `client`:

```
VITE_API_URL=http://localhost:8080
```

Run frontend:

```
npm run dev
```

---

# 🌐 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Ideas

```
GET /api/ideas
POST /api/ideas
```

---

# 📷 Screenshots

Add screenshots of your UI here.

Example:

```
/screenshots/home.png
/screenshots/dashboard.png
```

---

# 🔒 Environment Variables

### Server

```
PORT=
MONGO_URI=
JWT_SECRET=
```

### Client

```
VITE_API_URL=
```

---

# 📈 Future Improvements

* Idea voting system
* Admin dashboard
* Comment system
* Idea categories & filtering
* Email notifications
* Public idea marketplace

---

# 🌍 Deployment

Recommended deployment stack:

Frontend: **Vercel**
Backend: **Render / Railway**
Database: **MongoDB Atlas**

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature/new-feature
```

3. Commit your changes

```
git commit -m "Add new feature"
```

4. Push and create a pull request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Amit Raj**

GitHub: https://github.com/amitrajstm

If you like this project, please give it a ⭐ on GitHub.

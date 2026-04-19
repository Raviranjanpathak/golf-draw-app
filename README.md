# 🏌️ Golf Draw App

A full-stack web application that allows users to submit golf scores, participate in draw-based rewards, manage subscriptions, and support charities — all in one platform.

---

## 🚀 Live Demo

* 🌐 Frontend: https://golf-draw-app.vercel.app
* ⚙️ Backend: https://golf-draw-app.onrender.com

---

## 📌 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Add up to 5 golf scores (auto-removes oldest score)
* Dashboard with:

  * Total scores
  * Subscription status
  * Winnings
  * Selected charity
* Choose a charity to support
* Subscription plans (Monthly / Yearly)

---

### 🎯 Draw System

* Admin-triggered draw
* Generates 5 unique random numbers (1–45)
* Matching logic:

  * 3 matches → reward
  * 4 matches → higher reward
  * 5 matches → jackpot
* Updates user winnings automatically

---

### 👨‍💼 Admin Panel

* View all users
* Delete users
* Run draw
* Role-based access control

---

## 🛠️ Tech Stack

**Frontend**

* React.js (Vite)
* Axios
* Context API

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB Atlas

**Authentication**

* JWT (JSON Web Tokens)
* bcrypt (password hashing)

**Deployment**

* Frontend: Vercel
* Backend: Render

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Raviranjanpathak/golf-draw-app.git
cd golf-draw-app
```

---

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3️⃣ Setup Environment Variables

#### 📄 backend/.env

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### 📄 frontend/.env

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 4️⃣ Run the project

```bash
npm run dev
```

---

## 🔐 Admin Access

To enable admin:

1. Go to MongoDB Atlas
2. Open `users` collection
3. Change:

```json
"role": "admin"
```

4. Login again

---

## 📊 API Endpoints

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | /api/auth/register     | Register user       |
| POST   | /api/auth/login        | Login               |
| GET    | /api/auth/me           | Get current user    |
| POST   | /api/scores            | Add score           |
| GET    | /api/scores            | Get scores          |
| GET    | /api/scores/winnings   | Get winnings        |
| PUT    | /api/user/subscription | Update subscription |
| PUT    | /api/user/charity      | Update charity      |
| GET    | /api/draw              | Run draw (Admin)    |

---

## ⚠️ Notes

* Render free tier may sleep (first request can take 10–20 seconds)
* CORS is enabled for deployment
* Designed for assignment submission and demonstration

---

## 👨‍💻 Author

**Raviranjan Pathak**
GitHub: https://github.com/Raviranjanpathak

---

<img width="1904" height="864" alt="Screenshot 2026-04-19 151908" src="https://github.com/user-attachments/assets/7a0bfef0-23b5-43a3-bbe9-095f7e69c005" />
<img width="1772" height="928" alt="Screenshot 2026-04-19 151925" src="https://github.com/user-attachments/assets/8288b837-21ac-4fff-aa93-c81e7b738624" />
<img width="1919" height="897" alt="Screenshot 2026-04-19 125312" src="https://github.com/user-attachments/assets/859a0415-9224-4c25-b723-9e374683fcab" />
<img width="1916" height="901" alt="Screenshot 2026-04-19 125325" src="https://github.com/user-attachments/assets/7dcc648c-8000-4257-b0cb-7ff2051979fc" />
<img width="1919" height="824" alt="Screenshot 2026-04-19 125346" src="https://github.com/user-attachments/assets/1da20e12-ed77-4956-92dd-2c921a337d1b" />


# 🎬 Abhiflix — Full-Stack Streaming Platform

A premium, full-stack video streaming web application built with **React**, **Redux Toolkit**, **Tailwind CSS**, **Node.js**, **Express**, and **TMDB API Integration**.

![Abhiflix Desktop Preview](https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg)

---

## ✨ Features

- 🔐 **Authentication & Security**
  - JWT-based authentication flow (Sign up, Log in, Sign out)
  - Secure password hashing with `bcryptjs`
  - Protected API routes, Helmet HTTP headers, and rate limiting

- 👥 **Multi-Profile Management**
  - Create and switch between multiple user profiles (Adult & Kids)
  - Distinct avatar faces (Teal for Adult, Gold/Yellow for Kids)
  - Profile-isolated My List and Continue Watching history

- 🍿 **Rich Browsing Experience**
  - **Dynamic Hero Banner:** Showcasing featured original titles with video backdrop controls and action buttons
  - **Curated Media Rows:** Trending Now, Top 10 Today, Abhiflix Originals, Action & Thrillers, and Sci-Fi & Fantasy
  - **Hover Cards:** Hover pop-out cards with quick play, bookmarking, and info expansion
  - **Detail Modal:** Interactive pop-up with full overview, match score, rating, duration, cast, genres, and similar content recommendations

- 🔍 **Real-Time Instant Search**
  - Live search bar filtering titles, actors, and genres as you type

- 🎥 **Embedded Video Player**
  - Dedicated video player page with back navigation and custom playback environment

- 🎨 **Modern Aesthetics**
  - True dark mode palette (`#141414`)
  - Smooth glassmorphism header with auto-solidifying scroll behavior

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** React 19 + Vite
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Routing:** React Router v7
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React (`lucide-react`)
* **HTTP Client:** Axios

### **Backend**
* **Runtime:** Node.js (ES Modules)
* **Framework:** Express 5
* **Database:** Lowdb / Local File Database (`backend/data/db.json`)
* **Auth:** JSON Web Token (`jsonwebtoken`) & `bcryptjs`
* **Security:** `helmet`, `cors`, `express-rate-limit`

---

## 📁 Project Structure

```
Netflix_clone/
├── package.json              # Monorepo root scripts
├── backend/
│   ├── data/                 # JSON file database (db.json)
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Auth, Media, Profile, List controllers
│   │   ├── middleware/       # JWT auth & rate limiter middleware
│   │   ├── routes/           # Express API endpoints
│   │   ├── seeds/            # Seeding script with TMDB CDN assets
│   │   └── server.js         # Entry point
│   ├── .env                  # Backend environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/       # Common, Hero, Movie, Player, Profile components
    │   ├── context/          # Auth context provider
    │   ├── pages/            # Home, Login, Signup, Profiles, Search, Player pages
    │   ├── services/         # Axios API & TMDB clients
    │   ├── store/            # Redux slices (auth, media, list, watch)
    │   └── utils/            # Avatar SVG generators & helpers
    ├── .env                  # Frontend environment variables
    ├── index.html
    └── package.json
```

---

## 🚀 Quick Start & Installation

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

---

### Step 1: Clone & Install Dependencies

Clone the repository and install dependencies for both `backend` and `frontend` in one command:

```bash
git clone https://github.com/Abhishekroy1234/Netflix-Clone.git
cd Netflix-Clone
npm run install:all
```

---

### Step 2: Configure Environment Variables

#### **Backend (`backend/.env`)**
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
TMDB_API_KEY=76ac5f7a345a3387df49e85db5230b29
TMDB_BASE_URL=https://api.themoviedb.org/3
```

#### **Frontend (`frontend/.env`)**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_TMDB_API_KEY=76ac5f7a345a3387df49e85db5230b29
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

---

### Step 3: Seed Database (Optional)

Populate the database with official TMDB poster artwork and test user account (`user@netflix.com` / `Password123!`):

```bash
npm run seed
```

---

### Step 4: Run Development Servers

Open **two separate terminals** in the project root:

#### **Terminal 1: Start Backend**
```bash
npm run dev:backend
```
* 🌐 Backend running at: `http://localhost:5000`

#### **Terminal 2: Start Frontend**
```bash
npm run dev:frontend
```
* 🌐 Frontend running at: `http://localhost:5173`

---

## 🐳 Docker Deployment

You can run the entire Abhiflix application (Frontend + Backend) using Docker and Docker Compose.

### **Option 1: Quick Start with Docker Compose (Recommended)**

Run the following command from the project root:

```bash
docker compose up --build -d
```

- 🌐 **Frontend (Nginx):** `http://localhost` (or `http://localhost:5173`)
- 🌐 **Backend API:** `http://localhost:5000`
- 💾 **Data Persistence:** Database changes (`backend/data/db.json`) are automatically persisted via Docker volume mounts.

To stop the containers:
```bash
docker compose down
```

---

### **Option 2: Build & Run Individual Containers**

#### **Backend Image**
```bash
docker build -t netflix-backend ./backend
docker run -d -p 5000:5000 --name abhiflix-backend netflix-backend
```

#### **Frontend Image**
```bash
docker build -t netflix-frontend ./frontend
docker run -d -p 80:80 --name abhiflix-frontend netflix-frontend
```

---


## 📡 API Overview

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/v1/auth/signup` | `POST` | Register a new user |
| `/api/v1/auth/login` | `POST` | Authenticate user & return JWT token |
| `/api/v1/profiles` | `GET / POST` | Fetch or create user profiles |
| `/api/v1/media/hero` | `GET` | Get hero banner media |
| `/api/v1/media/trending` | `GET` | Get trending media list |
| `/api/v1/media/top10` | `GET` | Get Top 10 movies/shows |
| `/api/v1/media/movies` | `GET` | Get movie catalog |
| `/api/v1/media/tv` | `GET` | Get TV shows catalog |
| `/api/v1/media/search` | `GET` | Search media titles |
| `/api/v1/list/:profileId` | `GET / POST` | Manage profile's My List bookmarks |
| `/api/v1/history/:profileId` | `GET / POST` | Update watch history progress |

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).

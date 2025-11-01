# 🎵 LyricSync – Spotify Music Player with Live Lyrics

**LyricSync** is a modern web application that integrates with Spotify to play songs, display their live-synced lyrics, and provide smooth animated transitions with a beautiful UI.  
It allows users to browse, play, and visually experience lyrics in real time — built using **React**, **Spring Boot**, and **Spotify Web API**.

---

## 🚀 Features

- 🎧 **Spotify Integration** – Fetches songs, artists, and album details.
- 🧠 **Live Lyrics Animation** – Displays lyrics in sync with playback.
- 🎨 **Dynamic UI** – Responsive design with Tailwind CSS and smooth animations.
- 🌗 **Dark/Light Mode Support** – Adjusts UI according to the selected theme.
- 💫 **Animated Transitions** – Cards and lyrics have fluid hover and fade effects.
- 🕒 **Auto Lyrics Sync** – Character-by-character animation with optional manual sync.
- 🧩 **Backend Integration** – Fetches lyrics using a Spring Boot microservice.

---

## 🏗️ Tech Stack

### 🖥️ Frontend
- React 18+
- Tailwind CSS
- Lucide React (icons)
- Framer Motion (animations)
- Axios / Fetch API
- Spotify Web API

### ⚙️ Backend
- Spring Boot 3+
- WebClient (for external lyrics API)
- Java 17+
- Maven

### ☁️ APIs Used
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Lyrics.ovh API](https://lyricsovh.docs.apiary.io/)

---

## 📂 Project Structure

LyricSync/
│
├── lyricSync-frontend/ # React + Tailwind frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── LyricsDisplay.jsx
│ │ │ ├── TrackCard.jsx
│ │ │ └── PlayerControls.jsx
│ │ ├── App.jsx
│ │ └── main.js
│ └── package.json


|── lyricSync-backend/ # Spring Boot backend
├── src/main/java/com/excelr/lyricsync_backend/
│ ├── config/
│ │ └── CorsConfig.java
│ | |__ WebClientConfig.java
│ ├── controller/
│ │ └── APIController.java
│ ├── service/
│ │ └── LyricsService.java
│ ├ |__ SpotifyService.java
│ └── LyricSyncBackendApplication.java
└── pom.xml


---

## ⚡ Setup & Installation

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/bhaskarradha123/LyricSync/
cd LyricSync
```

### 🔹 2. Install Dependencies and Run Application
```bash
cd lyricSync-frontend
npm install
npm run dev
cd ../lyricSync-backend
mvn clean install
mvn spring-boot:run
```

### 🔹 3. Access the Application

Default backend server will start at http://localhost:8080
You can access the frontend at http://127.0.0.1:8000/

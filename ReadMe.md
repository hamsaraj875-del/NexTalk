<div align="center">

# 💬 NexTalk

### A Real-Time Chat Application Built with MERN & Socket.IO

<p>
  <b>Connect • Chat • Create Rooms • Communicate in Real Time</b>
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

</div>

---

## 📖 About

**NexTalk** is a full-stack real-time chatting application designed to provide fast and interactive communication between users.

The application uses **React** for the frontend, **Node.js and Express** for the backend, **MongoDB** for persistent data storage, and **Socket.IO** for real-time communication.

NexTalk supports both **private one-to-one conversations** and **chat rooms**, along with authentication, friend requests, online presence, room membership, blocking, notifications, and session management.

The project focuses on understanding how a real-world real-time communication system works from both the frontend and backend.

---

## ✨ Features
### 📧 Email-Based Communication

NexTalk does not require a phone number to create an account or communicate with other users.

Users can register and connect using their **email address**, making NexTalk easy to use without depending on a mobile number.
NexTalk

Email ──► Create Account ──► Find Users ──► Add Friends ──► Chat

### 🔐 Authentication

- User registration
- User login
- Password hashing using `bcrypt`
- Session-based authentication
- MongoDB session storage
- Session expiration
- Protected routes
- Request validation using `express-validator`
- Rate limiting for security-sensitive routes
- Secure backend authorization

---

### 👤 User Management

- Search for registered users
- View user information
- User initials/avatar display
- Online/offline presence
- Friend management
- Blocked-user management

---

### 👥 Friends System

Users can build their own friend network.

Features include:

- Search users
- Send friend requests
- Accept friend requests
- Track request status
- View accepted friends
- Prevent messaging between unauthorized users

Friend relationships are stored in MongoDB and verified by the backend before private messages are accepted.

---

## 🏠 Chat Rooms

NexTalk allows users to create and participate in dedicated chat rooms for group conversations.

Rooms are separate from one-to-one private chats and use **Socket.IO rooms** for real-time group communication.

### 🏗️ Room Creation

Users can create their own rooms by providing:

- Room name
- Room description
- Room type
- Room password when required

The creator automatically becomes the **room owner**.

A room stores information such as:

Room
├── Name
├── Description
├── Type
├── Password
├── Owner
├── Owner Name
└── Users

### 💬 Real-Time Private Chat

NexTalk uses **Socket.IO** for real-time one-to-one communication.

Features include:

- Real-time messaging
- Private conversations
- Online/offline detection
- Message persistence
- Offline message handling
- Automatic message delivery
- Message timestamps
- Chat previews
- Auto-scroll
- Typing interaction
- Keyboard/message sound effects

Messages are stored in MongoDB so that conversations are not dependent only on the active Socket.IO connection.

---

### 🟢 Real-Time Online Presence

NexTalk maintains Socket.IO mappings between users and sockets.

The server keeps track of:

```text
User ID → Socket ID
Socket ID → User ID
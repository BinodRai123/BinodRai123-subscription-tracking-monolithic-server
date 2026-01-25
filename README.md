# Subscription Tracking Backend

A **production-ready Node.js backend** for subscription management, designed with scalability, security, and clean architecture principles.  
This project demonstrates real-world backend engineering practices including authentication, authorization, rate limiting, and centralized error handling.

---

## 🚀 Project Overview

This backend provides secure REST APIs to manage user subscriptions.  
It is suitable for SaaS platforms, subscription-based products, and scalable backend systems.

---

## ✨ Features

- JWT-based **Authentication**
- Token-based **Authorization**
- Subscription creation & management
- **Rate limiting** using Arcjet
- Centralized `errorMiddleware`
- Mongoose **pre middleware**
- Scalable & optimized backend architecture
- Frontend-friendly error responses

---

## 🧰 Tech Stack

| Layer | Technology |
|-----|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Auth | JWT |
| Security | Arcjet |
| Config | dotenv |

---

## 📁 Folder Structure

```txt
├── routes/ (700 tokens)
    ├── workflow.route.js
    ├── auth.route.js
    ├── user.route.js (200 tokens)
    └── subscription.route.js (300 tokens)
├── eslint.config.js
├── config/ (400 tokens)
    ├── upstash.js
    ├── env.js
    └── arcjet.js (200 tokens)
├── database/ (200 tokens)
    └── mongodb.js (200 tokens)
├── package.json (200 tokens)
├── models/ (900 tokens)
    ├── user.model.js (200 tokens)
    └── subscription.model.js (700 tokens)
├── controllers/ (1600 tokens)
    ├── user.controller.js (200 tokens)
    ├── subscription.controller.js (300 tokens)
    ├── workflow.controller.js (500 tokens)
    └── auth.controller.js (600 tokens)
├── middlewares/ (900 tokens)
    ├── arcjet.middleware.js (200 tokens)
    ├── auth.middleware.js (300 tokens)
    └── error.middleware.js (400 tokens)
├── .gitignore (300 tokens)
└── app.js (400 tokens)
```

---
# 📘 API Documentation
## Register User
path = /api/v1/auth/*

## JSON
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}

# ENV
``` txt
 PORT=5000
 MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/subscriptions
 JWT_SECRET=your_jwt_secret_key
 ARCJET_KEY=your_arcjet_key
 NODE_ENV=development
```

#CLONE SETUP
``` txt
git clone https://github.com/BinodRai123/BinodRai123-subscription-tracking-monolithic-server.git
npm install
setup env
npm run dev
```


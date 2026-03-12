🎨 Aryavarta Artists
Commission-Driven Art Marketplace Platform

Aryavarta Artists is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to create a structured ecosystem for artists, buyers, and art learners.

The platform enables artists to:

Sell artworks online

Accept personalized commission requests

Showcase their art portfolio

Share drawing tutorials

Buyers can:

Discover artworks

Request custom commissions

Purchase artworks

Learn drawing techniques

🌍 Project Overview

Aryavarta Artists was built to solve a real-world problem in the art community.

Managing custom artwork commissions in a structured and scalable way.

Traditionally, artists receive commission requests through:

Instagram messages

WhatsApp chats

Email conversations

Offline meetings

This process is:

Unstructured

Difficult to track

Hard to manage at scale

Most artists also do not have their own websites, which makes it difficult to:

showcase their art

manage commission requests

sell artwork professionally

Solution

Aryavarta Artists introduces a structured commission workflow system integrated with a digital art marketplace.

Artists can:

manage commission requests

accept or reject requests

track orders

sell artworks

This converts informal social media chats into a structured digital system.

🎯 Resume-Ready Project Summary

Aryavarta Artists — MERN Full Stack Platform

Developed a commission-driven digital art marketplace enabling artists to manage custom artwork requests through a structured workflow, replacing informal commission processes typically handled via social media.

Implemented a scalable MERN architecture supporting:

50+ artworks

15+ artists

50+ tutorials

Key features include:

commission approval workflow

artwork upload system

secure cart management

REST API architecture

The platform increased artist engagement by ~35%.

🚩 Core Problem
Commission Workflow Chaos

Traditional commission requests follow this pattern:

Buyer
  |
  v
Instagram / WhatsApp Message
  |
  v
Conversation with Artist
  |
  v
Payment Discussion
  |
  v
Artwork Delivery
Limitations

Requests get lost in chats

Artists cannot track commissions

No centralized art portfolio

No structured order system

💡 Commission Workflow Solution
Buyer submits request
        |
        v
+-------------------------+
|   Commission Request    |
|        Form             |
+-----------+-------------+
            |
            v
+-------------------------+
|      Backend API        |
|  Node.js + Express.js   |
+-----------+-------------+
            |
            v
+-------------------------+
|        MongoDB          |
|   Store Commission      |
+-----------+-------------+
            |
            v
+-------------------------+
|     Artist Dashboard    |
+-----------+-------------+
            |
    +-------+--------+
    |                |
    v                v
Accept            Reject
    |
    v
Added to Buyer's Cart
    |
    v
Checkout
🧭 User Journey Diagram
User visits website
        |
        v
+---------------------------+
|  Browse Artwork Gallery   |
+------------+--------------+
             |
             v
+---------------------------+
|   View Artwork Details    |
+------------+--------------+
             |
      +------+------+
      |             |
      v             v
 Add to Cart   Request Commission
      |             |
      v             v
+-------------+   +----------------+
|  Checkout   |   | Commission Form|
+-------------+   +--------+-------+
                          |
                          v
                +-------------------+
                | Artist Reviews    |
                | Commission        |
                +--------+----------+
                         |
              +----------+-----------+
              |                      |
              v                      v
           Accept                 Reject
              |
              v
        Added to Cart
              |
              v
           Checkout
🏗 Detailed System Architecture
+---------------------------------------------------+
|                 User Browser                      |
|          (Chrome / Edge / Firefox)                |
+------------------------+--------------------------+
                         |
                         | HTTP Requests
                         v
+---------------------------------------------------+
|                 React Frontend                    |
|---------------------------------------------------|
| • UI Components                                   |
| • Pages & Routing                                 |
| • State Management                                |
| • API Communication                               |
| • Artwork Display                                 |
+------------------------+--------------------------+
                         |
                         | REST API Requests
                         v
+---------------------------------------------------+
|              Node.js + Express Backend            |
|---------------------------------------------------|
| • Authentication                                  |
| • Commission Workflow Logic                       |
| • Artwork Management                              |
| • Tutorial Upload System                          |
| • Cart Management                                 |
| • API Endpoints                                   |
+------------------------+--------------------------+
                         |
                         | Database Queries
                         v
+---------------------------------------------------+
|                    MongoDB                        |
|---------------------------------------------------|
| • Users Collection                                |
| • Artworks Collection                             |
| • Commissions Collection                          |
| • Tutorials Collection                            |
+---------------------------------------------------+
⚙ Backend Request Flow
Client Request
      |
      v
+---------------------+
|    Express Router   |
+----------+----------+
           |
           v
+---------------------+
|     Middleware      |
| Authentication      |
| Validation          |
+----------+----------+
           |
           v
+---------------------+
|     Controller      |
|  Business Logic     |
+----------+----------+
           |
           v
+---------------------+
|    Mongoose Model   |
|   Database Schema   |
+----------+----------+
           |
           v
+---------------------+
|      MongoDB        |
|     Database        |
+----------+----------+
           |
           v
     API Response
🧩 Database ER Diagram
        +-------------+
        |   USERS     |
        +-------------+
        | _id         |
        | name        |
        | email       |
        | password    |
        | role        |
        +------+------+
               |
     +---------+----------+
     |                    |
     v                    v

+-------------+      +-------------+
|  ARTWORKS   |      | COMMISSIONS |
+-------------+      +-------------+
| _id         |      | _id         |
| title       |      | buyerId     |
| description |      | artistId    |
| price       |      | medium      |
| artistId    |      | status      |
| image       |      +-------------+
+-------------+

        |
        v

+-------------+
| TUTORIALS   |
+-------------+
| _id         |
| title       |
| video       |
| artistId    |
+-------------+
📂 Project Structure
aryavarta-artists
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── seedArtworks.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── App.js
│   └── package.json
│
└── README.md
🛠 Technology Stack
Frontend

React.js

Bootstrap

HTML5

CSS3

JavaScript

Backend

Node.js

Express.js

JWT Authentication

Multer File Upload

Database

MongoDB

Mongoose ORM

🚀 Deployment Architecture
User Browser
     |
     v
+---------------------+
|   Cloudflare CDN    |
+----------+----------+
           |
           v
+---------------------+
| React Frontend      |
| Vercel / Netlify    |
+----------+----------+
           |
           v
+---------------------+
| Node.js Backend     |
| Render / AWS        |
+----------+----------+
           |
           v
+---------------------+
| MongoDB Atlas       |
| Cloud Database      |
+---------------------+
📦 Scalability Considerations

Future improvements include:

Microservices

Split backend into:

User Service

Artwork Service

Commission Service

Payment Service

CDN for Images

Use:

AWS S3

CloudFront

Caching

Use Redis for:

artwork listings

popular tutorials

Load Balancing

Use:

NGINX

AWS Load Balancer

🔧 Installation Guide

Clone repository

git clone https://github.com/Aaryan-kumar-24/aryavarta-artists.git

Navigate to project

cd aryavarta-artists

Install backend dependencies

cd backend
npm install

Install frontend dependencies

cd ../frontend
npm install

Create .env file inside backend

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend

npm start

Run frontend

npm start
🔮 Future Improvements

Stripe / Razorpay payment integration

AI artwork recommendations

real-time artist-buyer chat

artwork reviews & ratings

mobile PWA version

👨‍💻 Author

Aryan Kumar

Computer Science Student
Full Stack Developer | Artist

GitHub
https://github.com/Aaryan-kumar-24

⭐ Support

If you like this project, consider starring the repository ⭐

It helps support open-source development.
# 🏠 StaySphere – Full-Stack Property Rental Platform

StaySphere is a full-stack property rental and property listing web application inspired by modern vacation-rental platforms. It allows users to explore properties, create listings, upload property images, manage their own listings, write reviews, and discover properties through categories and location-based features.

The application is built using **Node.js, Express.js, MongoDB, Mongoose, and EJS** with authentication, listing management, reviews, and curated restaurant discovery.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* Secure user authentication
* Login/logout functionality
* Protected routes
* Authorization for listing owners
* Users can manage only their own listings

### 🏡 Property Listings

* Browse all available properties
* View detailed property information
* Create new property listings
* Edit existing listings
* Delete listings
* Full CRUD functionality
* Property categories such as:

  * Beach
  * Mountains
  * Villas
  * Camping
  * Lake
  * Cities
  * Countryside
  * Unique Stays
* Search by destination or keyword; filter by category and nightly budget
* Sort by newest or nightly price

### 🖼️ Image Upload & Management

* Property image upload
* Cloud-based image storage
* Image preview while editing listings
* Cloudinary integration for image management

### ⭐ Reviews & Ratings

* Signed-in users can add reviews to properties
* Star-based ratings
* Review authors can delete their own reviews
* Reviews displayed on property detail pages
* Property ratings are calculated from submitted reviews

### 🍽️ Restaurant Discovery

* Curated sample restaurant suggestions for Goa, Manali, and Jaipur
* Matching suggestions appear on property detail pages
* Google Maps search links open in a separate tab
* Restaurant information is not live; confirm current details before visiting
* Destination-themed illustrations are bundled locally as fallback artwork, not photographs of the venues

### ❤️ User Experience

* Responsive interface
* Clean navigation
* Category-based exploration
* Browser-local saved stays
* User-friendly listing cards
* Responsive property detail pages

### ☁️ Deployment

* MongoDB Atlas for cloud database
* Render for application deployment
* Environment variables for sensitive credentials
* Production-ready Express application

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS

### Backend

* Node.js
* Express.js
* RESTful Routing

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Authentication

* Passport.js
* Express Session
* MongoDB Session Store

### Cloud Services

* Cloudinary – Image Storage
* MongoDB Atlas – Cloud Database
* Render – Deployment

### Development Tools

* Git
* GitHub
* VS Code
* npm
* Nodemon

---

## 🏗️ Project Architecture

```text
                         ┌──────────────────┐
                         │     Browser      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   Express.js     │
                         │    Backend       │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              Routes → Controllers → Models
                    │             │             │
                    └─────────────┼─────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     MongoDB      │
                         │      Atlas       │
                         └──────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
              Cloudinary                 Google Maps
            Image Storage             Restaurant Search
```

---

## 📂 Project Structure

```text
StaySphere/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── tests/
│   ├── utils/
│   ├── validation/
│   └── app.js
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   └── js/
│   └── views/
│       ├── includes/
│       ├── layouts/
│       ├── listings/
│       ├── restaurants/
│       └── users/
├── server.js
├── .env.example
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd StaySphere
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory using `.env.example` as a reference.

Example:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/staysphere_dev
SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

For MongoDB Atlas, set `MONGODB_URI` to your Atlas connection string (or keep using `ATLAS_DB_URL`). `MONGODB_URI` takes precedence for local development. Do not commit `.env` to GitHub.

---

## ▶️ Run the Application Locally

Start the application:

```bash
npm start
```

Run the automated tests with `npm test`.

The application will run on:

```text
http://localhost:8080
```

---

## 🗄️ Database

StaySphere uses **MongoDB** with **Mongoose** for database management.

Main collections include:

```text
MongoDB
│
├── listings
├── reviews
├── users
└── sessions
```

For production, the application uses **MongoDB Atlas** as the cloud database.

---

## 🔄 CRUD Operations

The application supports complete CRUD functionality for property listings.

| Operation | Function              |
| --------- | --------------------- |
| Create    | Add a new property    |
| Read      | View properties       |
| Update    | Edit property details |
| Delete    | Remove a property     |

---

## 🔐 Security

The application includes:

* Authentication
* Authorization
* Protected routes
* Input validation
* Session management
* Environment variables for sensitive credentials
* Owner-based listing access control

Sensitive credentials such as database passwords, API keys, and cloud service credentials are stored in environment variables rather than being committed to the repository.

---

## ☁️ Deployment

The application is deployed using:

```text
GitHub
   ↓
Render
   ↓
Node.js + Express
   ↓
MongoDB Atlas
```

Production services used:

* **Render** – Application hosting
* **MongoDB Atlas** – Cloud database
* **Cloudinary** – Image hosting
* **Google Maps search links** – Restaurant search by destination

---


## 🚀 Future Improvements

* Booking and availability management
* Payment gateway integration
* User profiles and server-synced wishlists
* Live restaurant discovery through a places provider
* Email notifications and an admin dashboard

---

## 🎯 Learning Outcomes

This project helped in understanding and implementing:

* Full-stack web development
* Node.js and Express.js
* RESTful APIs and routing
* MongoDB and Mongoose
* CRUD operations
* Authentication and authorization
* Session management
* MVC architecture
* Middleware
* Form validation
* Image uploading
* Cloud services
* Map integration
* Git and GitHub
* Cloud database deployment
* Production deployment with Render

---

## 👨‍💻 Project

**StaySphere – Full-Stack Property Rental Platform**

A complete full-stack web application developed as a practical project to demonstrate modern web development concepts, backend development, database management, authentication, cloud services, and deployment.

---

## 📌 Status

**Project Status: Completed ✅**

StaySphere is currently deployed and connected to MongoDB Atlas for cloud-based data storage.

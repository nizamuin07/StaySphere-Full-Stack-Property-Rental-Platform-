# 🏠 StaySphere – Full-Stack Property Rental Platform

StaySphere is a full-stack property rental and property listing web application inspired by modern vacation-rental platforms. It allows users to explore properties, create listings, upload property images, manage their own listings, write reviews, and discover properties through categories and location-based features.

The application is built using **Node.js, Express.js, MongoDB, Mongoose, and EJS** with authentication, authorization, image management, reviews, and map integration.

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
  * Iconic Cities
  * Countryside
  * Unique Stays

### 🖼️ Image Upload & Management

* Property image upload
* Cloud-based image storage
* Image preview while editing listings
* Cloudinary integration for image management

### ⭐ Reviews & Ratings

* Users can add reviews to properties
* Star-based ratings
* Review deletion
* Reviews displayed on property detail pages

### ❤️ User Experience

* Responsive interface
* Clean navigation
* Category-based exploration
* Favorite/heart-style property interaction
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
                         │      Server      │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
                Routes         Models        Middleware
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
              Cloudinary                    Mapbox
            Image Storage                 Location Maps
```

---

## 📂 Project Structure

```text
StaySphere/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   ├── error.ejs
│   └── home.ejs
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
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

Create a `.env` file in the root directory.

Example:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token
```

Do not commit `.env` to GitHub.

---

## ▶️ Run the Application Locally

Start the development server:

```bash
nodemon app.js
```

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
* **Mapbox** – Maps and location services

---

## 📸 Screenshots

### Home Page

*Add screenshot here*

### Explore Listings

*Add screenshot here*

### Property Details

*Add screenshot here*

### Add Listing

*Add screenshot here*

### User Authentication

*Add screenshot here*

---

## 🚀 Future Improvements

* Advanced property search
* Price range filtering
* Advanced sorting
* User profile management
* Wishlist functionality
* Booking/reservation system
* Payment gateway integration
* Email notifications
* Improved recommendation system
* Admin dashboard
* More advanced responsive UI

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

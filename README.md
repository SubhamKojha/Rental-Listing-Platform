# Rental Listing Platform

> A production-grade server-rendered rental marketplace built with Node.js, Express, MongoDB, and EJS demonstrating enterprise-level backend architecture with authentication, image uploads, interactive maps, and relational data modeling.

**🌐 Live Demo:** [https://rental-listing-platform.onrender.com/](https://rental-listing-platform.onrender.com)

---

## Overview  

A full-featured, backend-first rental marketplace showcasing real-world development patterns. This application handles user authentication, listing management with image uploads, location visualization, star-based reviews, and strict authorization controls—all rendered server-side with clean MVC architecture.

**Core Stack:**
- **Node.js + Express** - Server-side logic  
- **MongoDB + Mongoose** - Relational data modeling  
- **EJS Templating** - Server-side rendering  
- **Passport.js** - Session-based authentication  
- **connect-mongo** - MongoDB session store for persistent login
- **Cloudinary** - Image storage and optimization  
- **Leaflet.js** - Interactive maps  
- **Joi** - Schema validation

---

## Features  

**User Management**
- Registration and login with Passport.js
- Session-based authentication with persistent cookies (connect-mongo)
- Protected routes with ownership-based authorization

**Listing Management**
- Full CRUD operations with image uploads
- Multiple images per listing via Multer and Cloudinary
- Interactive location maps with Leaflet.js
- Cascading deletes (listing removal deletes reviews and images)

**Review System**
- Star-based ratings (1-5) with comments
- User-authenticated reviews
- Author-only deletion rights

**Security**
- Joi schema validation
- Ownership middleware for access control
- Password hashing via passport-local-mongoose
- MongoDB session store for secure cookie persistence
- Environment-based secrets management

---

## Tech Stack  

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, express-session, connect-mongo |
| **File Uploads** | Multer, Cloudinary SDK |
| **Maps** | Leaflet.js |
| **Templating** | EJS |
| **Validation** | Joi |
| **Deployment** | Render |
| **Architecture** | MVC (Models, Controllers, Routes, Middlewares, Views) |
| **Error Handling** | Custom ExpressError class, wrapAsync middleware |

---

## Setup

### Installation
```bash
git clone https://github.com/<your-username>/rental-listing-platform.git
cd Backend
npm install
```

### Environment Variables
Create `.env` file in `Backend/`:
```ini
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/airbnb
SESSION_SECRET=your_random_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Seed Database (Optional)
```bash
node init/index.js
```

### Start Server
```bash
node app.js
# or with nodemon
nodemon app.js
```
**Application runs at:** http://localhost:3000

---

## Project Structure

```
Backend/
│
├── controllers/
│   ├── listingController.js       # Listing CRUD operations
│   ├── reviewController.js        # Review create/delete logic
│   └── userController.js          # Registration, login, logout handlers
│
├── middlewares/
│   ├── authorization.js           # isOwner, isReviewAuthor checks
│   ├── geocode.js                 # Location to coordinates conversion
│   ├── userMiddleware.js          # isLoggedIn authentication check
│   └── validations.js             # Joi schema validators
│
├── models/
│   ├── listing.js                 # Listing schema with geometry and owner ref
│   ├── review.js                  # Review schema with author and rating
│   └── user.js                    # User schema with Passport plugin
│
├── routes/
│   ├── listingRoutes.js           # /listings routes
│   ├── reviewRoutes.js            # /listings/:id/reviews routes
│   └── userRoutes.js              # /signup, /login, /logout routes
│
├── utils/
│   ├── ExpressError.js            # Custom error class
│   └── wrapAsync.js               # Async error wrapper
│
├── views/
│   ├── includes/                  # Partials (navbar, footer, flash)
│   ├── layouts/                   # Main layout with Leaflet
│   ├── listings/                  # Listing views
│   ├── users/                     # Auth views
│   ├── error.ejs                  # Error page
│   └── home.ejs                   # Landing page
│
├── public/
│   ├── javascripts/               # Client-side JS
│   └── stylesheets/               # CSS
│
├── init/
│   └── index.js                   # Database seeding script
│
├── app.js                         # Main Express application
├── cloudConfig.js                 # Cloudinary configuration
├── schema.js                      # Joi validation schemas
└── package.json                   # Dependencies
```

---

## How It Works

### Request Flow
```
Client Request
    ↓
Middleware Chain (Session + connect-mongo, Auth, Flash)
    ↓
Route Handler (Validation, Authorization)
    ↓
Controller (Business Logic, DB Operations)
    ↓
MongoDB (Models, Relations, Cascading)
    ↓
View Rendering (EJS + Leaflet)
    ↓
Response
```

### Database Relations

```
User (1) ──owns──> (Many) Listing
User (1) ──authors──> (Many) Review
Listing (1) ──has──> (Many) Review
```

**Cascading Delete Operations:**
- When a listing is deleted: all reviews and Cloudinary images are automatically removed
- Implemented via Mongoose pre-delete middleware hooks

**Authorization Rules:**
- Only listing owners can edit/delete listings
- Only review authors can delete their reviews
- Only authenticated users can create listings/reviews

---

## Security Features

- Password hashing (passport-local-mongoose)
- Persistent session management (connect-mongo)
- Input validation (Joi schemas)
- Authorization middleware (ownership checks)
- CSRF protection (connect-flash)
- Environment secrets (.env)
- Sanitized uploads (Cloudinary)

---

## Learning Outcomes

- **Backend Development:** MVC architecture, RESTful APIs, authentication/authorization, middleware patterns
- **Database:** MongoDB schema design, document references, cascading operations
- **Session Management:** Persistent login with connect-mongo session store
- **Integrations:** Cloudinary (images), Passport.js (auth), Multer (uploads), Leaflet.js (maps)
- **Deployment:** Production deployment on Render with environment configuration

---

## Deployment

The application is deployed on Render with MongoDB Atlas for database hosting and environment variables configured for production security.

**Live URL:** [https://rental-listing-platform.onrender.com/](https://rental-listing-platform.onrender.com)

---

## Disclaimer

**This project is built for educational and portfolio purposes.**

# Rental Listing Platform

> A production-grade server-rendered rental marketplace built with Node.js, Express, MongoDB, and EJS demonstrating enterprise-level backend architecture with authentication, image uploads, interactive maps, and relational data modeling.

---

## Overview  

A full-featured, backend-first rental marketplace showcasing real-world development patterns. This application handles user authentication, listing management with image uploads, location visualization, star-based reviews, and strict authorization controls—all rendered server-side with clean MVC architecture.

**Core Stack:**
- **Node.js + Express** - Server-side logic  
- **MongoDB + Mongoose** - Relational data modeling  
- **EJS Templating** - Server-side rendering  
- **Passport.js** - Session-based authentication  
- **Cloudinary** - Image storage and optimization  
- **Leaflet.js** - Interactive maps  
- **Joi** - Schema validation

---

## Features  

**User Management**
- Registration and login with Passport.js
- Session-based authentication
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
- Environment-based secrets management

---

## Tech Stack  

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, express-session |
| **File Uploads** | Multer, Cloudinary SDK |
| **Maps** | Leaflet.js |
| **Templating** | EJS |
| **Validation** | Joi |
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
│   ├── listingRoutes.js           # /listings routes (GET, POST, PUT, DELETE)
│   ├── reviewRoutes.js            # /listings/:id/reviews routes
│   └── userRoutes.js              # /signup, /login, /logout routes
│
├── utils/
│   ├── ExpressError.js            # Custom error class
│   └── wrapAsync.js               # Async error wrapper
│
├── views/
│   ├── includes/
│   │   ├── flash.ejs              # Flash message alerts
│   │   ├── footer.ejs             # Footer partial
│   │   └── navbar.ejs             # Navigation bar with auth state
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs        # Main layout with Leaflet integration
│   │
│   ├── listings/
│   │   ├── edit.ejs               # Edit listing form
│   │   ├── index.ejs              # All listings with cluster map
│   │   ├── newForm.ejs            # Create listing form
│   │   └── show.ejs               # Listing detail with reviews and map
│   │
│   ├── users/
│   │   ├── login.ejs              # Login form
│   │   └── signup.ejs             # Registration form
│   │
│   ├── error.ejs                  # Error page template
│   └── home.ejs                   # Landing page
│
├── public/
│   ├── images/                    # Static images
│   ├── javascripts/
│   │   ├── map.js                 # Leaflet map initialization
│   │   └── script.js              # Additional client-side scripts
│   └── stylesheets/
│       └── style.css              # Custom CSS styles
│
├── init/
│   └── index.js                   # Database seeding script
│
├── node_modules/                  # NPM dependencies
│
├── .env                           # Environment variables (not committed)
├── .gitignore                     # Git ignore rules
├── app.js                         # Main Express application
├── cloudConfig.js                 # Cloudinary SDK configuration
├── package.json                   # NPM dependencies and scripts
├── package-lock.json              # Dependency lock file
├── schema.js                      # Joi validation schemas
└── README.md                      # Project documentation
```

---

## How It Works

### Request Flow
```
Client Request
    ↓
Middleware Chain (Session, Auth, Flash)
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

### Key Flows

**Authentication**
- User registers/logs in → Passport validates → Session created → User redirected

**Listing Creation**
- Form submission → Validation → Multer processes images → Cloudinary uploads → MongoDB saves → Map renders

**Review System**
- Auth check → Validation → Review saved with user/listing references → Display on listing page

**Cascading Deletes**
- Owner deletes listing → Pre-delete hook triggered → Reviews deleted → Cloudinary images removed → Success

### Database Relations

```
┌─────────────────────────┐
│         User            │
├─────────────────────────┤
│ _id: ObjectId           │
│ username: String        │
│ email: String           │
│ password: String (hash) │
└───────┬─────────────────┘
        │
        │ owner (one-to-many)
        │
        ▼
┌─────────────────────────────────┐
│         Listing                 │
├─────────────────────────────────┤
│ _id: ObjectId                   │
│ title: String                   │
│ description: String             │
│ images: [{                      │
│   url: String,                  │
│   filename: String              │
│ }]                              │
│ price: Number                   │
│ location: String                │
│ country: String                 │
│ geometry: {                     │
│   type: "Point",                │
│   coordinates: [lng, lat]       │
│ }                               │
│ owner: ObjectId → User._id      │
│ reviews: [ObjectId → Review._id]│
└───────┬─────────────────────────┘
        │
        │ reviews (one-to-many)
        │
        ▼
┌─────────────────────────┐
│        Review           │
├─────────────────────────┤
│ _id: ObjectId           │
│ rating: Number (1-5)    │
│ comment: String         │
│ author: ObjectId → User │
│ createdAt: Date         │
└─────────────────────────┘
        ▲
        │
        │ author (many-to-one)
        │
┌───────┴─────────────────┘
│         User            
└─────────────────────────
```

**Relationship Details:**

**User → Listing (One-to-Many)**
- One user can own multiple listings
- Each listing has exactly one owner
- Referenced via `listing.owner` pointing to `user._id`

**Listing → Review (One-to-Many)**
- One listing can have multiple reviews
- Reviews are stored as array of ObjectIds in `listing.reviews`
- Each review belongs to one listing

**User → Review (One-to-Many)**
- One user can author multiple reviews
- Each review has exactly one author
- Referenced via `review.author` pointing to `user._id`

**Cascading Delete Operations:**
- When a **listing** is deleted:
  - All associated **reviews** are automatically removed
  - All **Cloudinary images** are deleted from cloud storage
  - Implemented via Mongoose pre-delete middleware hooks

**Authorization Rules:**
- Only the **listing owner** can edit or delete the listing
- Only the **review author** can delete their review
- Only **authenticated users** can create listings or reviews
- Enforced via custom middleware in `middlewares/authorization.js`

---

## Security Features

- Password hashing (passport-local-mongoose)
- Session management (express-session)
- Input validation (Joi schemas)
- Authorization middleware (ownership checks)
- CSRF protection (connect-flash)
- Environment secrets (.env)
- Sanitized uploads (Cloudinary)

---

## Learning Outcomes

**Backend Development:** MVC architecture, RESTful design, authentication/authorization, middleware patterns, async error handling

**Database:** MongoDB schema design, document references, cascading operations, relational modeling in NoSQL

**Integrations:** Cloudinary (images), Passport.js (auth), Multer (uploads), Leaflet.js (maps)

**Best Practices:** Environment config, clean code structure, error handling, validation, secure credentials

---

## Disclaimer

**This project is built for educational and portfolio purposes.**

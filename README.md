# 🏡 rental-listing-platform
> A server-rendered **Airbnb-style backend application** built with Node.js, Express, MongoDB, and EJS.  
> This project focuses on clean MVC architecture, RESTful routing, and robust error handling — no SPA fluff, just solid backend fundamentals.

---

## 🚀 Overview  

**airbnb.backend** is a classic, no-nonsense backend-first web application inspired by Airbnb.  
It blends traditional server-side rendering with modern Express practices, proving that not everything needs React to be powerful.

Core pillars:

- ⚙️ Node.js + Express backend  
- 🍃 MongoDB + Mongoose for data persistence  
- 🧱 MVC architecture  
- 🎨 EJS templating for SSR  
- 🧠 Centralized async error handling  
- 🔗 Relational data handling with cascading deletes

Listings, reviews, and users flow through clean routes and views — predictable, scalable, and interview-safe.

---

## ✨ Features  

- 🏘️ **CRUD Listings** (Create, Read, Update, Delete)  
- ⭐ **Star-Based Reviews System** per listing  
- 👤 **User Registration & Authentication** (Only registered users can create reviews)  
- 🔗 **Database Relations** with cascading deletes (deleting a listing removes all its reviews)  
- 🧱 **MVC Architecture** (Models, Routes, Views)  
- ⚠️ **Centralized Error Handling** (`wrapAsync`, `ExpressError`)  
- 🎨 **Server-Side Rendering** with EJS  
- 📁 **Static Asset Management** via `/public`  
- 🔐 **Environment-Based Configuration**  
- 🧼 **Clean RESTful Routes**  

---

## 🛠️ Tech Stack  

| Layer | Tech |
|------|------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Templating** | EJS |
| **Architecture** | MVC |
| **Styling** | CSS (served from `/public`) |
| **Config** | dotenv |

---

## ⚙️ Setup & Run  

### 1️⃣ Clone Repo  
```bash
git clone https://github.com/<your-username>/airbnb-backend.git
cd Backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create .env File
Create a `.env` file inside `Backend/`:
```ini
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/airbnb
SESSION_SECRET=your_secret_key
```

### 4️⃣ Seed Database (Optional)
```bash
node init/index.js
```
This populates MongoDB with sample listings and data for testing.

### 5️⃣ Start Server
```bash
node app.js
```
Or with nodemon:
```bash
nodemon app.js
```
App runs at:
👉 http://localhost:3000

---

## 📁 Project Structure
```
Backend/
│
├── init/
│   └── index.js                 # Database seeding script
│
├── models/
│   ├── listing.js               # Listing schema
│   ├── review.js                # Review schema (star-based)
│   └── user.js                  # User schema
│
├── routes/
│   ├── listingRoutes.js         # Listing CRUD routes
│   └── reviewRoutes.js          # Review routes (auth required)
│
├── utils/
│   ├── ExpressError.js          # Custom error class
│   └── wrapAsync.js             # Async error wrapper
│
├── views/
│   ├── includes/
│   │   ├── flash.ejs            # Flash messages partial
│   │   ├── footer.ejs           # Footer partial
│   │   └── navbar.ejs           # Navbar partial
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs      # Main layout template
│   │
│   ├── listings/
│   │   ├── edit.ejs             # Edit listing form
│   │   ├── index.ejs            # All listings view
│   │   ├── newForm.ejs          # Create listing form
│   │   └── show.ejs             # Single listing detail
│   │
│   ├── error.ejs                # Error page
│   └── home.ejs                 # Homepage
│
├── public/
│   ├── images/                  # Static images
│   ├── javascripts/             # Client-side JS
│   └── stylesheets/             # CSS files
│
├── node_modules/                # Dependencies
│
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── app.js                       # Main application file
├── package.json                 # NPM dependencies
├── package-lock.json            # Dependency lock file
└── schema.js                    # Validation schemas
```

---

## 🧠 How It Works

1. Client hits a route (e.g. `/listings`)
2. Route delegates logic to controllers
3. MongoDB fetches data via Mongoose models
4. Data is passed into EJS templates
5. Errors are caught automatically via `wrapAsync`
6. `ExpressError` ensures consistent error rendering

**Key Database Relations:**
- Reviews are linked to Listings via ObjectId references
- When a listing is deleted, all associated reviews are automatically removed (cascading delete)
- Only authenticated users can create star-based reviews
- User authentication state controls review creation access

---

## ⚠️ Disclaimer

This project is **built for learning, practice, and portfolio purposes**.  
Before production use, additional security, validation, and scalability measures are required.

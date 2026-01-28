const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

async function seedUsers() {
  await mongoose.connect(process.env.MONGO_URL + "airbnb");
  console.log("Connected to airbnb (users seed)");

  await User.deleteMany({});

  const users = [
    {
      username: "nsec-student",
      email: "student@gmail.com",
      password: "password123"
    },
    {
      username: "_subhK_",
      email: "ojhas6667@gmail.com",
      password: "password123"
    },
    {
      username: "Subham_Kumar_Ojha",
      email: "gamerzdevil405@gmail.com",
      password: "password123"
    },
    {
      username: "SubhamKOjha",
      email: "santoshojha8888@gmail.com",
      password: "password123"
    }
  ];

  for (let user of users) {
    const newUser = new User({
      username: user.username,
      email: user.email
    });
    await User.register(newUser, user.password);
  }

  console.log("Users seeded successfully");
  process.exit();
}

seedUsers();

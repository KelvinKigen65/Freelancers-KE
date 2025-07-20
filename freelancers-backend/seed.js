require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const users = [
    {
      fullName: "Test Freelancer",
      email: "freelancer@test.com",
      password: "password123",
      role: "freelancer",
    },
    {
      fullName: "Test Client",
      email: "client@test.com",
      password: "password123",
      role: "client",
    },
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log("✅ Test users seeded");
  mongoose.disconnect();
});

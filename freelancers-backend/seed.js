require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const password = await bcrypt.hash("password123", 10);

  await User.create([
    {
      fullName: "Test Freelancer",
      email: "freelancer@test.com",
      password,
      role: "freelancer",
    },
    {
      fullName: "Test Client",
      email: "client@test.com",
      password,
      role: "client",
    },
  ]);

  console.log("✅ Test users created");
  mongoose.disconnect();
});

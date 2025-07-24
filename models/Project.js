const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    budget: Number,
    deadline: Date,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

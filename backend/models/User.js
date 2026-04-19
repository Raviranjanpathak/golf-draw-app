import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    subscription: {
      type: String,
      enum: ["monthly", "yearly", "none"],
      default: "none",
    },

    subscriptionStart: Date,
    subscriptionEnd: Date,

    charity: {
      name: { type: String, default: "Red Cross" },
      percentage: { type: Number, default: 10, min: 10, max: 100 },
    },

    winnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
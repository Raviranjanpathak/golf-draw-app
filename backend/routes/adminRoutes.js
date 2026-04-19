import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only access" });
  }
  next();
};



// 📥 Get all users
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// 🔄 Update subscription (ADMIN)
router.put("/user/:id/subscription", protect, adminOnly, async (req, res) => {
  try {
    const { subscription } = req.body;

    // ✅ validate
    if (!["monthly", "yearly", "none"].includes(subscription)) {
      return res.status(400).json({ msg: "Invalid subscription type" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ handle subscription logic
    if (subscription === "none") {
      user.subscription = "none";
      user.subscriptionStart = null;
      user.subscriptionEnd = null;
    } else {
      const now = new Date();
      let endDate = new Date();

      if (subscription === "monthly") {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      user.subscription = subscription;
      user.subscriptionStart = now;
      user.subscriptionEnd = endDate;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ❌ Delete user
router.delete("/user/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();

    res.json({ msg: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
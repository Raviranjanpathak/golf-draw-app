import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//  Update subscription
router.put("/subscription", protect, async (req, res) => {
  try {
    console.log("USER:", req.user); 

    const { plan } = req.body;

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({ msg: "Invalid plan" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const now = new Date();
    let endDate = new Date();

    if (plan === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    user.subscription = plan;
    user.subscriptionStart = now;
    user.subscriptionEnd = endDate;

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.json(updatedUser);

  } catch (err) {
    console.error("SUBSCRIPTION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


//  Update charity
router.put("/charity", protect, async (req, res) => {
  try {
    const { name, percentage } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Charity name required" });
    }

    if (percentage === undefined || percentage < 10 || percentage > 100) {
      return res.status(400).json({ msg: "Percentage must be 10–100" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.charity = { name, percentage };
    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json(safeUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
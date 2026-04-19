import express from "express";
import Score from "../models/Score.js";
import { addScore, getWinnings } from "../controllers/Score.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkSubscription } from "../middleware/subscription.js";

const router = express.Router();

//  Add score
router.post("/", protect, checkSubscription, addScore);

//  Get scores
router.get("/", protect, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user._id })
      .select("value date")
      .sort({ date: -1 });

    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Get winnings
router.get("/winnings", protect, getWinnings);

export default router;
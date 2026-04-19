import Score from "../models/Score.js";
import User from "../models/User.js";

//  ADD SCORE
export const addScore = async (req, res) => {
  try {
    const { value, date } = req.body;
    const userId = req.user._id;

    //  Validation
    if (!value || !date) {
      return res.status(400).json({
        msg: "Value and date are required",
      });
    }

    if (value < 1 || value > 45) {
      return res.status(400).json({
        msg: "Score must be between 1–45",
      });
    }

    //  Normalize date (IMPORTANT FIX)
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    //  Check duplicate (safe)
    const exists = await Score.findOne({
      userId,
      date: normalizedDate,
    });

    if (exists) {
      return res.status(400).json({
        msg: "Score already exists for this date",
      });
    }

    //  Keep only last 5 scores
    const scores = await Score.find({ userId }).sort({ date: 1 });

    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    //  Create new score
    const newScore = await Score.create({
      userId,
      value,
      date: normalizedDate,
    });

    res.json(newScore);

  } catch (err) {
    //  Handle duplicate race condition (IMPORTANT FIX)
    if (err.code === 11000) {
      return res.status(400).json({
        msg: "Score already exists for this date",
      });
    }

    res.status(500).json({ error: err.message });
  }
};



//  GET WINNINGS (FIXED)
export const getWinnings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      winnings: user.winnings || 0,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
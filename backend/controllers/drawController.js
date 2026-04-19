import Draw from "../models/Draw.js";
import Score from "../models/Score.js";
import User from "../models/User.js";

export const runDraw = async (req, res) => {
  try {
    //  prevent multiple draws per day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingDraw = await Draw.findOne({
      createdAt: { $gte: today },
    });

    if (existingDraw) {
      return res.status(200).json({
        msg: "Draw already executed today",
      });
    }

    //  Generate numbers
    const numbers = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }

    // Get scores
    const scores = await Score.find();

    if (scores.length === 0) {
      return res.status(400).json({
        msg: "No scores available for draw",
      });
    }

    const userScoresMap = {};

    scores.forEach((s) => {
      const id = s.userId.toString();

      if (!userScoresMap[id]) {
        userScoresMap[id] = [];
      }

      userScoresMap[id].push(s.value);
    });

    const winners = [];

    for (const userId in userScoresMap) {
      const userScores = [...new Set(userScoresMap[userId])];

      const matchCount = userScores.filter((s) =>
        numbers.includes(s)
      ).length;

      if (matchCount >= 3) {
        let amount = 0;

        if (matchCount === 3) amount = 50;
        if (matchCount === 4) amount = 100;
        if (matchCount === 5) amount = 500;

        winners.push({
          userId,
          matchCount,
          reward: amount,
        });
      }
    }

    //  bulk update winnings
    const bulkOps = winners.map((w) => ({
      updateOne: {
        filter: { _id: w.userId },
        update: { $inc: { winnings: w.reward } },
      },
    }));

    if (bulkOps.length > 0) {
      await User.bulkWrite(bulkOps);
    }

    // Save draw
    const draw = await Draw.create({
      numbers,
      winners,
    });

    res.json(draw);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
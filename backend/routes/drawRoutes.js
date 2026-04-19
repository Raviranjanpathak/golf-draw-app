import express from "express";
import { runDraw } from "../controllers/drawController.js";
import { protect } from "../middleware/authMiddleware.js";
import Draw from "../models/Draw.js"; 

const router = express.Router();

//  Admin middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only access" });
  }
  next();
};

//  Run draw (admin)
router.get("/", protect, adminOnly, runDraw);


//  Upload proof
router.post("/proof/:drawId", protect, async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ msg: "Proof image required" });
    }

    const draw = await Draw.findById(req.params.drawId);

    if (!draw) {
      return res.status(404).json({ msg: "Draw not found" });
    }

    const winner = draw.winners.find(
      (w) => w.userId.toString() === req.user._id.toString()
    );

    if (!winner) {
      return res.status(404).json({ msg: "Not a winner" });
    }

    winner.proof = image;
    winner.status = "pending";

    await draw.save();

    res.json({ msg: "Proof submitted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  Admin verify winner
router.put("/verify/:drawId/:userId", protect, adminOnly, async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.drawId);

    if (!draw) {
      return res.status(404).json({ msg: "Draw not found" });
    }

    const winner = draw.winners.find(
      (w) => w.userId.toString() === req.params.userId
    );

    if (!winner) {
      return res.status(404).json({ msg: "Winner not found" });
    }

    if (winner.status === "approved") {
      return res.status(400).json({ msg: "Already approved" });
    }

    winner.status = "approved";

    await draw.save();

    res.json({ msg: "Winner approved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
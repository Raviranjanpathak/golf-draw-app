import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//  Get logged-in user
router.get("/me", protect, (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      subscription: req.user.subscription,
      subscriptionEnd: req.user.subscriptionEnd,
      charity: req.user.charity,
      winnings: req.user.winnings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
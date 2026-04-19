import express from "express";
import authRoutes from "./authRoutes.js";
import scoreRoutes from "./scoreRoutes.js";

const router = express.Router();

// Public routes
router.use("/auth", authRoutes);

// Protected routes handled inside scoreRoutes
router.use("/scores", scoreRoutes);

export default router;
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import adminRoutes from "./routes/adminRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// 🔐 Security middleware
app.use(helmet());

// 🌐 CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// 📦 Body parser
app.use(express.json());

// 🚀 Routes
app.use("/api", routes);
app.use("/api/admin", adminRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/user", userRoutes);

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// ❌ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
  });
});

// 🚀 Start server AFTER DB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
  app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);
  res.status(500).json({ error: err.message });
});
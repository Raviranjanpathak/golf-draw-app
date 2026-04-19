import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check token format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    // ✅ Verify token safely
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    );

    // ✅ Fetch only needed fields (optimized)
    const user = await User.findById(decoded.id).select(
      "_id name email role subscription subscriptionEnd charity winnings"
    );

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;

    next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }

    return res.status(401).json({ msg: "Invalid token" });
  }
};
import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    numbers: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr) => {
          const unique = new Set(arr);

          return (
            arr.length === 5 &&
            unique.size === 5 && // ✅ no duplicates
            arr.every((n) => n >= 1 && n <= 45)
          );
        },
        message: "Draw must contain 5 unique numbers between 1–45",
      },
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },

    winners: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        matchCount: {
          type: Number,
          min: 0,
          max: 5,
        },

        reward: {
          type: Number,
          default: 0,
        },

        proof: {
          type: String,
          default: "",
        },

        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Draw", drawSchema);
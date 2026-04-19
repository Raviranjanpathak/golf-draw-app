import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    value: {
      type: Number,
      min: 1,
      max: 45,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      set: (val) => {
        const d = new Date(val);
        d.setHours(0, 0, 0, 0);
        return d;
      },
    },
  },
  { timestamps: true, strict: true }
);

// ✅ Prevent duplicate score per day per user
scoreSchema.index({ userId: 1, date: 1 }, { unique: true });

// ✅ Faster sorting queries
scoreSchema.index({ userId: 1, date: -1 });

export default mongoose.model("Score", scoreSchema);
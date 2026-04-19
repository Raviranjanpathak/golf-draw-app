export const checkSubscription = (req, res, next) => {
  try {
    // ✅ Safety check
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    // ✅ Normalize dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const end = new Date(req.user.subscriptionEnd);
    end.setHours(0, 0, 0, 0);

    // ✅ Conditions
    const hasNoPlan =
      !req.user.subscription || req.user.subscription === "none";

    const isExpired =
      !req.user.subscriptionEnd || end < today;

    if (hasNoPlan || isExpired) {
      return res.status(403).json({
        msg: "Subscription expired or not active",
      });
    }

    next();

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
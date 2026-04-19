import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function Dashboard() {
  const { user, refreshUser } = useContext(AuthContext);

  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState(0);
  const [loading, setLoading] = useState(false);

  // 📊 Fetch scores
  const fetchScores = async () => {
    try {
      const res = await API.get("/scores");
      setScores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 💰 Fetch winnings
  const fetchWinnings = async () => {
    try {
      const res = await API.get("/scores/winnings");
      setWinnings(res.data.winnings);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔄 Load data
  useEffect(() => {
    if (user) {
      fetchScores();
      fetchWinnings();
    }
  }, [user]);

  // 💳 Buy subscription
  const handleSubscription = async (plan) => {
    try {
      setLoading(true);

      await API.put("/user/subscription", { plan });
      await refreshUser();
      await fetchWinnings();

    } catch (err) {
      console.log(err);
      alert("Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: "20px" }}>
          Welcome {user?.name}
        </h2>

        <div className="grid grid-4">

          {/* Subscription */}
          <div className="card">
            <h3>Subscription</h3>

            <p style={{ fontWeight: "bold" }}>
              {user?.subscription || "None"}
            </p>

            {user?.subscriptionEnd && (
              <p style={{ fontSize: "12px", color: "gray" }}>
                Expires: {new Date(user.subscriptionEnd).toDateString()}
              </p>
            )}

            <button
              onClick={() => handleSubscription("monthly")}
              className="btn btn-primary"
              disabled={loading}
            >
              Buy Monthly
            </button>

            <button
              onClick={() => handleSubscription("yearly")}
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
              disabled={loading}
            >
              Buy Yearly
            </button>
          </div>

          {/* Total Scores */}
          <div className="card">
            <h3>Total Scores</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              {scores.length}
            </p>
          </div>

          {/* Charity */}
          <div className="card">
            <h3>Charity</h3>

            <select
              className="input"
              value={user?.charity?.name || ""}
              onChange={async (e) => {
                try {
                  await API.put("/user/charity", {
                    name: e.target.value,
                    percentage: 10,
                  });
                  await refreshUser();
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <option value="">Select Charity</option>
              <option value="Red Cross">Red Cross</option>
              <option value="UNICEF">UNICEF</option>
              <option value="Save the Children">Save the Children</option>
            </select>

            <p style={{ marginTop: "10px", color: "gray" }}>
              Selected: {user?.charity?.name || "None"}
            </p>

            <p style={{ marginTop: "5px", color: "green", fontSize: "14px" }}>
              {user?.charity?.percentage || 10}% goes to charity
            </p>
          </div>

          {/* Winnings */}
          <div className="card">
            <h3>Winnings</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              ₹ {winnings}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
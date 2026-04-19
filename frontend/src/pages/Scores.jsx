import { useState, useEffect } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Scores() {
  const [form, setForm] = useState({ value: "", date: "" });
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //  Fetch scores
  const fetchScores = async () => {
    try {
      const res = await API.get("/scores");
      setScores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  // ➕ Submit score
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.value || !form.date) {
      return setError("All fields required");
    }

    if (form.value < 1 || form.value > 45) {
      return setError("Score must be between 1–45");
    }

    try {
      setLoading(true);

      await API.post("/scores", {
        value: Number(form.value),
        date: form.date,
      });

      setForm({ value: "", date: "" });
      setSuccess("Score added successfully ✔");
      fetchScores();

    } catch (err) {
      setError(err?.response?.data?.msg || "Error adding score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />

      <div className="container">

        {/* FORM */}
        <div className="card" style={{ maxWidth: "400px" }}>
          <h3>Add Score</h3>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={submit}>
            <input
              type="number"
              placeholder="Score (1-45)"
              value={form.value}
              onChange={(e) =>
                setForm({ ...form, value: e.target.value })
              }
              className="input"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="input"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </form>
        </div>

        {/* SCORES */}
        <div style={{ marginTop: "30px" }}>
          <h3>Your Scores</h3>

          {scores.length === 0 ? (
            <p>No scores added yet</p>
          ) : (
            <div className="grid grid-4">
              {scores.map((s) => (
                <div key={s._id} className="card score-card">
                  <h2>{s.value}</h2>

                  <p className="score-date">
                    {new Date(s.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
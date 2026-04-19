import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [drawNumbers, setDrawNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📥 Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

// 🎯 Run draw
const runDraw = async () => {
  try {
    setLoading(true);

    const res = await API.get("/draw");

    if (res.data?.numbers) {
      setDrawNumbers(res.data.numbers);
      alert("Draw generated 🎉");
    } else if (res.data?.msg) {
      alert(res.data.msg);
    }

  } catch (err) {
    const msg = err?.response?.data?.msg;

    if (msg) {
      alert(msg); // "Draw already executed"
    } else {
      alert("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  // ❌ Delete user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/user/${id}`);

      // instant UI update
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

        {/* TOP CARDS */}
        <div className="grid grid-4">
          
          {/* Total Winnings */}
          <div className="card">
            <h3>Total Winnings</h3>
            <p style={bigText}>
              ₹ {users.reduce((sum, u) => sum + (u.winnings || 0), 0)}
            </p>
          </div>

          {/* Users */}
          <div className="card">
            <h3>Total Users</h3>
            <p style={bigText}>{users.length}</p>
          </div>

          {/* Draw */}
          <div className="card">
            <h3>Run Draw</h3>

            <button
              onClick={runDraw}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Generating..." : "Generate Draw"}
            </button>

            {drawNumbers.length > 0 && (
              <p style={{ marginTop: "10px", color: "green" }}>
                Draw generated successfully
              </p>
            )}

            <div style={ballContainer}>
              {drawNumbers.length === 0 ? (
                <p style={{ fontSize: "12px" }}>No draw yet</p>
              ) : (
                drawNumbers.map((n, i) => (
                  <div key={i} style={ball}>
                    {n}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Analytics */}
          <div className="card">
            <h3>Analytics</h3>
            <p>Total Users: {users.length}</p>
            <p>Total Draws: {drawNumbers.length > 0 ? "1 (latest)" : "0"}</p>
          </div>
        </div>

        {/* USERS TABLE */}
        <div style={{ marginTop: "30px" }}>
          <h3>Users List</h3>

          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subscription</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>

                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          background:
                            u.subscription === "none"
                              ? "#e5e7eb"
                              : "#d1fae5",
                        }}
                      >
                        {u.subscription}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const bigText = {
  fontSize: "22px",
  fontWeight: "bold",
};

const ballContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
  flexWrap: "wrap",
};

const ball = {
  width: "40px",
  height: "40px",
  background: "#16a34a",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  fontWeight: "bold",
};
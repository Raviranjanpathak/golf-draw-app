import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true }); // ✅ better navigation
  };

  // ⏳ prevent flicker
  if (loading) return null;

  return (
    // <div
    //   style={{
    //     background: "#0f172a",
    //     color: "white",
    //     padding: "12px 24px",
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    //   }}
    // >
    <div className="navbar">
      {/* Left */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontWeight: "bold" }}>🏌️ GolfDraw</h2>

        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/scores" className="nav-link">Scores</Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="nav-link">Admin</Link>
        )}
      </div>

      {/* Right */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span style={{ fontWeight: "500" }}>
           {user?.name}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}







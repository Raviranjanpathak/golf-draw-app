import { charities } from "../data/charities";
import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function Charities() {
  //  Select charity
  const selectCharity = async (name) => {
    try {
      await API.put("/user/charity", {
        name,
        percentage: 10,
      });

      alert("Charity selected successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to select charity");
    }
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Navbar />

      <div className="container">
        <h2 style={{ marginBottom: "20px" }}>
          ❤️ Supported Charities
        </h2>

        <div className="grid grid-4">
          {charities.map((c, i) => (
            <div key={i} className="card charity-card">
              <h3 style={{ marginBottom: "10px" }}>{c.name}</h3>

              <p className="charity-desc">{c.desc}</p>

              <button
                onClick={() => selectCharity(c.name)}
                className="btn btn-primary"
                style={{ marginTop: "15px" }}
              >
                Support
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
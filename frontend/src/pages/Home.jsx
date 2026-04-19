import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🏌️ GolfDraw</h2>

        <div>
          <button onClick={() => navigate("/login")} style={styles.btnOutline}>
            Login
          </button>
          <button onClick={() => navigate("/register")} style={styles.btnPrimary}>
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Play. Win. Give Back.</h1>

        <p style={styles.heroText}>
          Enter your golf scores, participate in monthly draws, win rewards, and
          support meaningful charities — all in one platform.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button onClick={() => navigate("/register")} style={styles.btnPrimary}>
            Start Now
          </button>
          <button onClick={() => navigate("/login")} style={styles.btnOutline}>
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <Feature title="🎯 Track Scores" desc="Track your performance easily." />
        <Feature title="🎁 Monthly Draw" desc="Win exciting rewards every month." />
        <Feature title="❤️ Support Charity" desc="Give back with every subscription." />
        <Feature title="📊 Smart Dashboard" desc="All your data in one place." />
      </div>

      {/* HOW IT WORKS */}
      <div style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How it Works</h2>

        <div style={styles.steps}>
          <Step  text="Sign up and subscribe" />
          <Step  text="Enter your golf scores" />
          <Step  text="Participate in draw" />
          <Step 
           text="Win rewards & support charities" />
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <h2 style={styles.sectionTitle}>Ready to start your journey?</h2>

        <button
          onClick={() => navigate("/register")}
          style={{ ...styles.btnPrimary, marginTop: "20px" }}
        >
          Join Now 🚀
        </button>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <h3 style={{ marginBottom: "10px" }}>Raviranjan Pathak</h3>

        <p style={{ opacity: 0.7, marginBottom: "10px" }}>
          Full Stack Developer | MERN Stack
        </p>

        <div style={styles.socials}>
          <a href="https://github.com/Raviranjanpathak" target="_blank" style={styles.link}>
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" style={styles.link}>
            LinkedIn
          </a>
          <a href="mailto:ravipathak.pc1@gmail.com" style={styles.link}>
            Email
          </a>
        </div>

        <p style={{ marginTop: "15px", fontSize: "12px", opacity: 0.6 }}>
          © {new Date().getFullYear()} GolfDraw. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Feature({ title, desc }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.cardText}>{desc}</p>
    </div>
  );
}

function Step({ num, text }) {
  return (
    <div style={styles.step}>
      <span>{num}</span>
      <p>{text}</p>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    alignItems: "center",
  },

  logo: {
    fontWeight: "700",
    letterSpacing: "1px",
  },

  hero: {
    textAlign: "center",
    marginTop: "80px",
    padding: "0 20px",
  },

  heroTitle: {
    fontSize: "52px",
    fontWeight: "800",
    marginBottom: "15px",
  },

  heroText: {
    maxWidth: "600px",
    margin: "0 auto",
    opacity: 0.75,
    lineHeight: "1.6",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
    padding: "80px 40px",
  },

  card: {
    background: "white",
    color: "#111",
    padding: "25px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  cardText: {
    fontSize: "14px",
    color: "gray",
    marginTop: "8px",
  },

  howSection: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255,255,255,0.05)",
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
  },

  steps: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  step: {
    fontSize: "16px",
    opacity: 0.8,
  },

  cta: {
    textAlign: "center",
    padding: "70px 20px",
  },

  footer: {
    textAlign: "center",
    padding: "40px 20px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    marginTop: "40px",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },

  link: {
    color: "#60a5fa",
    textDecoration: "none",
    fontSize: "14px",
  },

  btnPrimary: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    marginLeft: "10px",
    cursor: "pointer",
    fontWeight: "500",
  },

  btnOutline: {
    background: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.5)",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
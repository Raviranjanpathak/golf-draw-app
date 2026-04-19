import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// 🔐 Attach token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ⚠️ Global error handling
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // Network error
    if (!err.response) {
      console.error("Network error");
      return Promise.reject(err);
    }

    // Unauthorized
    if (err.response.status === 401) {
      localStorage.clear();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;
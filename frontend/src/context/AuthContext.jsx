import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");

      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.log("Error parsing user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔐 Login
  const login = (data) => {
    const userData = {
      ...data.user,
      token: data.token,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // 🔄 Refresh user
  const refreshUser = async () => {
    try {
      const res = await API.get("/auth/me");

      const stored = JSON.parse(localStorage.getItem("user"));

      const updatedUser = {
        ...res.data,
        token: stored?.token,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
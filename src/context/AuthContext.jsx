import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextOnly";
import axios from "axios";

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Load user info if token exists
  useEffect(() => {
    if (token) {
      axios
        .get("https://panterypalsideback.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post("https://panterypalsideback.onrender.com/api/auth/login", {
      email,
      password,
    });
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

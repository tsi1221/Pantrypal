import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Call backend login API
      const response = await api.post("/auth/login", { email, password });

      // Expected response:
      // { token: "JWT_TOKEN", user: { id, name, email } }

      const { token, user } = response.data;

      // Save token & user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>Pantry Pal</h2>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <div className="login-links">
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

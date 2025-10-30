import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Expected backend response:
      // { msg: "User registered", user: { id, name, email } }

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Your Pantry Pal Account</h2>

        {error && <div className="error-alert">{error}</div>}
        {success && <div className="success-alert">{success}</div>}

        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
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

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Register"}
        </button>

        <p className="redirect-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </form>
    </div>
  );
};

export default Register;

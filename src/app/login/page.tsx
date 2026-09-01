import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    const loginError = await login(email, password);
    setIsLoading(false);
    if (!loginError) {
      navigate(from, { replace: true });
    } else {
      setError(loginError);
    }
  };

  return (
    <div className="login-container">
      <div className="login-panel login-left">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-text">SK</span>
          </div>
          <div className="login-lang">
            <button className="lang-toggle" aria-label="Language selector">
              🌍 EN
            </button>
          </div>
        </div>

        <div className="login-content">
          <h1>Welcome</h1>
          <p className="login-subtitle">Sign in to your account to access the admin panel</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="login-footer">
            <p>Need help? <a href="mailto:support@example.com">Contact support</a></p>
          </div>
        </div>
      </div>

      <div className="login-panel login-right">
        <div className="login-overlay">
          <div className="overlay-content">
            <div className="loading-spinner"></div>
            <h2>Southern Kaduna</h2>
            <p>Explore the rich cultural heritage and vibrant communities of Southern Kaduna</p>
          </div>
        </div>
      </div>
    </div>
  );
}

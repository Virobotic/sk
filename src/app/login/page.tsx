import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); setError("");
    const loginError = await login(email, password);
    if (!loginError) navigate(from, { replace: true }); else setError(loginError);
  };
  return <main className="page-content contact-page"><header className="page-header"><p className="eyebrow">Secure area</p><h1>Admin Login</h1></header><section className="contact-card card"><form className="contact-form-inner" onSubmit={handleSubmit}><div className="field"><label className="label" htmlFor="email">Email address</label><input id="email" className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div><div className="field"><label className="label" htmlFor="password">Password</label><input id="password" className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></div>{error && <p role="alert" style={{ color: "#a11d1d" }}>{error}</p>}<button className="button primary" type="submit">Sign in</button></form></section></main>;
}

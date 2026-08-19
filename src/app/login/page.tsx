import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); setError("");
    if (await login(password)) navigate(from, { replace: true }); else setError("Invalid password");
  };
  return <main className="page-content contact-page"><header className="page-header"><h1>Admin Login</h1></header><section className="contact-card card"><form className="contact-form-inner" onSubmit={handleSubmit}><div className="field"><label className="label" htmlFor="password">Password</label><input id="password" className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <p role="alert" style={{ color: "red" }}>{error}</p>}<button className="button primary" type="submit">Login</button></form></section></main>;
}

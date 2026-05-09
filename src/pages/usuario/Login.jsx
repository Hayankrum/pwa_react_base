import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/ui/PasswordInput";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email.trim().toLowerCase(), password.trim());
    
    if (result.success) {
      navigate("/posts");
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header"><h1>Login</h1></div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">senha</label>
            <PasswordInput
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="btn-primary btn-block">
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <p className="mt-2 text-soft">não tem conta? <Link to="/register">registre-se</Link></p>
        </form>
      </div>
    </div>
  );
}
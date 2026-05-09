import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/ui/PasswordInput";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePassword } = useAuth();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (newPass.length < 6) {
      setError("Nova senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (newPass !== confirm) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);

    const result = await changePassword(current, newPass);
    
    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header"><h1>Alterar Senha</h1></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label htmlFor="current">senha atual</label><PasswordInput id="current" name="current" value={current} onChange={e => setCurrent(e.target.value)} placeholder="Digite sua senha atual" required /></div>
          <div className="form-group"><label htmlFor="newPass">nova senha</label><PasswordInput id="newPass" name="newPass" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Digite sua nova senha" required /></div>
          <div className="form-group"><label htmlFor="confirm">confirmar</label><PasswordInput id="confirm" name="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirme sua nova senha" required /></div>
          {error && <div className="error-message">{error}</div>}
          <div className="flex"><button type="submit" disabled={loading} className="btn-primary">{loading ? "Alterando..." : "Alterar"}</button><button type="button" onClick={() => navigate("/profile")} disabled={loading} className="btn-secondary">Cancelar</button></div>
        </form>
      </div>
    </div>
  );
}
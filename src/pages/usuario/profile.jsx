import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/ui/PasswordInput";

// Ícone de perfil SVG
const ProfileIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
  </svg>
);

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, updateProfile, logout, deleteAccount } = useAuth();
  const [user, setUser] = useState({ nome: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePwd, setDeletePwd] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      setLoading(false);
    }
  }, [authUser]);

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError("");
    
    const result = await updateProfile(user);
    
    if (result.success) {
      setEditMode(false);
      setSuccessMsg("Perfil atualizado com sucesso");
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setError(result.error);
    }
  }

  async function handleDeleteAccount() {
    setError("");
    
    const result = await deleteAccount(deletePwd);
    
    if (result.success) {
      navigate("/register");
    } else {
      setError(result.error);
    }
  }

  if (loading) return <div className="loading">carregando...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex" style={{ alignItems: "center", gap: "1rem" }}>
          <ProfileIcon />
          <h1>perfil</h1>
        </div>
        <div className="flex">
          <button onClick={logout} className="btn-danger btn-sm">Sair</button>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {!editMode ? (
        <div style={{ maxWidth: "500px" }}>
          <div className="terminal-card">
            <div className="form-group">
              <label>nome</label>
              <div>{user.nome}</div>
            </div>
            <div className="form-group">
              <label>email</label>
              <div>{user.email}</div>
            </div>
            <div className="flex mt-2">
              <button onClick={() => setEditMode(true)} className="btn-secondary btn-sm">Editar</button>
              <button onClick={() => navigate("/change-password")} className="btn-secondary btn-sm">Alterar Senha</button>
              <button onClick={() => setShowDelete(true)} className="btn-danger btn-sm">Deletar Conta</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleUpdateProfile}>
            <div className="form-group">
              <label>nome</label>
              <input 
                value={user.nome} 
                onChange={e => setUser({...user, nome: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>email</label>
              <input 
                type="email" 
                value={user.email} 
                onChange={e => setUser({...user, email: e.target.value})} 
                required 
              />
            </div>
            <div className="flex">
              <button type="submit" className="btn-primary">Salvar</button>
              <button type="button" onClick={() => setEditMode(false)} className="btn-secondary">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {showDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>deletar conta</h2>
            <p>esta ação é irreversível</p>
            <PasswordInput 
              name="deletePwd"
              value={deletePwd} 
              onChange={e => setDeletePwd(e.target.value)} 
              placeholder="confirme sua senha"
            />
            <div className="modal-actions">
              <button onClick={handleDeleteAccount} className="btn-danger">Confirmar</button>
              <button onClick={() => setShowDelete(false)} className="btn-secondary">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
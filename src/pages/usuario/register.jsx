import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PasswordInput from "../../components/ui/PasswordInput";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = "nome é obrigatório";
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = "nome deve ter pelo menos 3 caracteres";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "email inválido";
    }
    
    if (!formData.password) {
      newErrors.password = "senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "senha deve ter pelo menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "as senhas não coincidem";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleRegister(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    const result = await register(
      formData.email.trim().toLowerCase(),
      formData.password,
      formData.nome.trim()
    );
    
    if (result.success) {
      navigate("/posts");
    } else {
      if (result.error === "Email já existe") {
        setErrors({ email: "email já cadastrado" });
      } else {
        setErrors({ general: result.error });
      }
    }
    
    setLoading(false);
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header">
          <h1>cadastro</h1>
        </div>
        
        {errors.general && <div className="error-message">{errors.general}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? "error" : ""}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>
          
          <div className="form-group">
            <label>email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>senha</label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label>confirmar senha</label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <div className="form-group">
            <button type="submit" disabled={loading} className="btn-primary btn-block">
              {loading ? "Processando..." : "Cadastrar"}
            </button>
          </div>
        </form>
        
        <p className="mt-2 text-soft">
          já tem conta? <Link to="/login">[faça login]</Link>
        </p>
      </div>
    </div>
  );
}
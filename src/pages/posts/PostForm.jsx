import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postsService } from "../../api/posts";
import { useAuth } from "../../context/AuthContext";

export default function PostForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState({ texto: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      loadPost();
    }
  }, [id]);

  async function loadPost() {
    try {
      setLoading(true);
      const post = await postsService.getById(id);
      
      // Verificar se o usuário é o autor do post
      if (post.usuario.id !== user.id) {
        setError("Você não tem permissão para editar este post");
        return;
      }
      
      setPostData({ texto: post.texto });
      setError("");
    } catch (error) {
      setError("Erro ao carregar post");
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        await postsService.update(id, postData);
      } else {
        await postsService.create(postData);
      }
      navigate("/posts");
    } catch (error) {
      setError(error.response?.data?.error || `Erro ao ${isEditing ? 'atualizar' : 'criar'} post`);
      console.error("Error saving post:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
  }

  if (loading && isEditing) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header">
          <h1>{isEditing ? "Editar Post" : "Novo Post"}</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="texto">Conteúdo do Post</label>
            <textarea
              id="texto"
              name="texto"
              value={postData.texto}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Digite o conteúdo do seu post..."
              className="form-textarea"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Salvando..." : (isEditing ? "Atualizar" : "Publicar")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/posts")}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

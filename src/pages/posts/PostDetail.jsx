import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { postsService } from "../../api/posts";
import { useAuth } from "../../context/AuthContext";

export default function PostDetail() {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPost();
  }, [id]);

  async function loadPost() {
    try {
      setLoading(true);
      const postData = await postsService.getById(id);
      setPost(postData);
      setError("");
    } catch (error) {
      setError("Post não encontrado");
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      await postsService.delete(id);
      navigate("/posts");
    } catch (error) {
      setError("Erro ao excluir post");
      console.error("Error deleting post:", error);
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('pt-BR');
  }

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error || !post) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <Link to="/posts" className="btn btn-secondary">
          Voltar para Posts
        </Link>
      </div>
    );
  }

  const isAuthor = isAuthenticated && user?.id === post.usuario.id;

  return (
    <div className="page-container">
      <div className="post-detail">
        <div className="post-header">
          <div className="post-author">
            <Link to={`/profile/${post.usuario.id}`} className="author-link">
              <h2>{post.usuario.nome}</h2>
            </Link>
            <span className="post-email">{post.usuario.email}</span>
          </div>
          <div className="post-meta">
            <div className="post-date">
              Criado em: {formatDate(post.criado_em)}
            </div>
            {post.atualizado_em !== post.criado_em && (
              <div className="post-updated">
                Atualizado em: {formatDate(post.atualizado_em)}
              </div>
            )}
          </div>
        </div>

        <div className="post-content">
          <p>{post.texto}</p>
        </div>

        <div className="post-actions">
          <Link to="/posts" className="btn btn-secondary">
            Voltar
          </Link>
          
          {isAuthor && (
            <>
              <Link to={`/posts/${id}/edit`} className="btn btn-warning">
                Editar
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Excluir
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

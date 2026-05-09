import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postsService } from "../../api/posts";
import { useAuth } from "../../context/AuthContext";

export default function PostList() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPosts();
  }, [searchQuery]);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await postsService.getAll(searchQuery);
      setPosts(data);
      setError("");
    } catch (error) {
      setError("Erro ao carregar posts");
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(postId) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;

    try {
      await postsService.delete(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      setError("Erro ao excluir post");
      console.error("Error deleting post:", error);
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('pt-BR');
  }

  if (loading) {
    return <div className="loading">Carregando posts...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Posts</h1>
        {isAuthenticated && (
          <Link to="/posts/create" className="btn btn-primary">
            Novo Post
          </Link>
        )}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum post encontrado.</p>
            {isAuthenticated && (
              <Link to="/posts/create" className="btn btn-primary">
                Criar primeiro post
              </Link>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author">
                  <Link to={`/profile/${post.usuario.id}`} className="author-link">
                    <strong>{post.usuario.nome}</strong>
                  </Link>
                  <span className="post-email">({post.usuario.email})</span>
                </div>
                <div className="post-date">
                  {formatDate(post.criado_em)}
                </div>
              </div>
              
              <div className="post-content">
                <p>{post.texto}</p>
              </div>

              <div className="post-actions">
                <Link to={`/posts/${post.id}`} className="btn btn-secondary">
                  Ver
                </Link>
                {isAuthenticated && user?.id === post.usuario.id && (
                  <>
                    <Link to={`/posts/${post.id}/edit`} className="btn btn-warning">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-danger"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </div>

              {post.atualizado_em !== post.criado_em && (
                <div className="post-updated">
                  Atualizado em: {formatDate(post.atualizado_em)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

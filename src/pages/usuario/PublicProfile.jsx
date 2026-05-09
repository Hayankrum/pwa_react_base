import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { postsService } from "../../api/posts";

// Ícone de perfil SVG
const ProfileIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
  </svg>
);

export default function PublicProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  async function loadUserProfile() {
    try {
      setLoading(true);
      
      // Carregar posts do usuário para obter informações
      const userPosts = await postsService.getAll();
      const filteredPosts = userPosts.filter(post => post.usuario.id === parseInt(userId));
      
      if (filteredPosts.length > 0) {
        // Obter informações do usuário a partir do primeiro post
        const userInfo = filteredPosts[0].usuario;
        setUser(userInfo);
        setPosts(filteredPosts);
        setError("");
      } else {
        setError("Usuário não encontrado ou não possui posts");
      }
    } catch (error) {
      setError("Erro ao carregar perfil do usuário");
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString('pt-BR');
  }

  if (loading) {
    return <div className="loading">Carregando perfil...</div>;
  }

  if (error || !user) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <Link to="/posts" className="btn btn-secondary">
          Voltar para Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Perfil de {user.nome}</h1>
        <Link to="/posts" className="btn btn-secondary">
          Voltar
        </Link>
      </div>

      <div className="profile-public">
        <div className="profile-header">
          <div className="profile-avatar">
            <ProfileIcon />
          </div>
          <div className="profile-info">
            <h2>{user.nome}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="posts-count">{posts.length} post(s) publicado(s)</p>
          </div>
        </div>

        <div className="posts-section">
          <h3>Posts de {user.nome}</h3>
          
          {posts.length === 0 ? (
            <div className="empty-state">
              <p>Este usuário ainda não publicou nenhum post.</p>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="post-author">
                      <strong>{post.usuario.nome}</strong>
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
                  </div>

                  {post.atualizado_em !== post.criado_em && (
                    <div className="post-updated">
                      Atualizado em: {formatDate(post.atualizado_em)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

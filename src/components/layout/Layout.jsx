import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">Django Blog</div>
          <nav className="header-nav">
            <NavLink to="/" className="nav-item">
              Posts
            </NavLink>
            {!isAuthenticated ? (
              <NavLink to="/login" className="nav-item">
                Entrar
              </NavLink>
            ) : (
              <NavLink to="/profile" className="nav-item">
                Perfil
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
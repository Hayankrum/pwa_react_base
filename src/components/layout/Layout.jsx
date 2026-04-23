import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";

/* ICONES PADRÃO (todos iguais) */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 11L12 4l8 7" />
    <path d="M6 10v10h12V10" />
  </svg>
);

const BoxIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 7l9 4 9-4" />
    <path d="M3 7v10l9 4 9-4V7" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const LoginIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 3h5v18h-5" />
    <path d="M10 17l4-5-4-5" />
    <path d="M14 12H3" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M10 3H5v18h5" />
    <path d="M14 7l5 5-5 5" />
    <path d="M19 12H9" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19 12a7 7 0 0 0-.1-1l2-1-2-4-2 1a7 7 0 0 0-2-1l-.3-2h-4l-.3 2a7 7 0 0 0-2 1l-2-1-2 4 2 1a7 7 0 0 0 0 2l-2 1 2 4 2-1a7 7 0 0 0 2 1l.3 2h4l.3-2a7 7 0 0 0 2-1l2 1 2-4-2-1c.1-.3.1-.7.1-1z" />
  </svg>
);

/* COMPONENTE */

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <nav className="sidebar">
        <NavLink to="/" className="item">
          <HomeIcon />
        </NavLink>

        <NavLink to="/pagina1" className="item">
          <BoxIcon />
        </NavLink>

        {token && (
          <NavLink to="/pagina2" className="item">
            <PlusIcon />
          </NavLink>
        )}

        {!token ? (
          <NavLink to="/pagina3" className="item">
            <LoginIcon />
          </NavLink>
        ) : (
          <button onClick={logout} className="item">
            <LogoutIcon />
          </button>
        )}

        <NavLink to="/pagina4" className="item">
          <UserIcon />
        </NavLink>

        <NavLink to="/pagina5" className="item">
          <SettingsIcon />
        </NavLink>
      </nav>

      {/* CONTEÚDO */}
      <main className="content">
        <header className="topbar">
          <h2>Base de teste</h2>
        </header>

        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
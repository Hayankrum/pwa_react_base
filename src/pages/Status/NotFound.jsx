import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-container">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "4rem",
          marginBottom: "1rem",
          color: "var(--accent)"
        }}>
          404
        </div>
        
        <h1 style={{ fontSize: "1.2rem", fontWeight: "normal", marginBottom: "0.5rem" }}>
          página não encontrada
        </h1>
        
        <p style={{ fontSize: "0.8rem", color: "var(--text-soft)", marginBottom: "1.5rem" }}>
          a página que você procura não existe ou foi movida
        </p>
        
        <Link to="/" style={{ color: "var(--accent)" }}>
          [voltar ao início]
        </Link>
      </div>
    </div>
  );
}
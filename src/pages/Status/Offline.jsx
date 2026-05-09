import { Link } from "react-router-dom";

export default function Offline() {
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
          fontSize: "3rem",
          marginBottom: "1rem",
          opacity: 0.5
        }}>
          🔌
        </div>
        
        <h1 style={{ fontSize: "1.2rem", fontWeight: "normal", marginBottom: "0.5rem" }}>
          servidor desconectado
        </h1>
        
        <p style={{ fontSize: "0.8rem", color: "var(--text-soft)", marginBottom: "1.5rem" }}>
          não foi possível conectar ao servidor
        </p>
        
        <button 
          onClick={() => window.location.reload()} 
          className="btn-ghost"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
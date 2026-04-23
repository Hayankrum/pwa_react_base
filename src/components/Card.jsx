import "./card.css";

export default function Card({ nome = "", tipo = "" }) {
  const partes = nome.split(" ");

  return (
    <div className="card">
      <span className={`tag ${tipo.toLowerCase()}`}>
        {tipo}
      </span>

      <div className="info">
        <p className="first">{partes[0] || ""}</p>
        <p className="last">{partes[1] || ""}</p>
      </div>
    </div>
  );
}
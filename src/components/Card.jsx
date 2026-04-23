import "./card.css";

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" className="img-icon">
    <rect x="3" y="5" width="18" height="14" />
    <circle cx="8" cy="10" r="2" />
    <path d="M21 15l-5-5-6 6-3-3-4 4" />
  </svg>
);

export default function Card({ nome = "", tipo = "", imagem }) {
  const partes = nome.split(" ");

  return (
    <div className="card">

      <div className="card-media">

        <span className="tag">{tipo}</span>

        {imagem ? (
          <img src={imagem} className="card-img" />
        ) : (
          <ImageIcon />
        )}

      </div>

      <div className="info">
        <p className="first">{partes[0]}</p>
        <p className="last">{partes[1]}</p>
      </div>

    </div>
  );
}
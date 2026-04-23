import "./Home.css";
import Card from "../components/Card"; // 🔥 IMPORTANTE

/* ICONES SVG */
const FilterIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 6h16" />
    <path d="M7 12h10" />
    <path d="M10 18h4" />
  </svg>
);

const GridIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="4" y="4" width="6" height="6" />
    <rect x="14" y="4" width="6" height="6" />
    <rect x="4" y="14" width="6" height="6" />
    <rect x="14" y="14" width="6" height="6" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="6" />
    <path d="M20 20l-4-4" />
  </svg>
);

const clientes = [
  { nome: "Emma Anderson", tipo: "CLIENT" },
  { nome: "Jodi Buchanan", tipo: "CLIENT" },
  { nome: "Kathrine Carter", tipo: "CLIENT" },
  { nome: "Dolan Jose", tipo: "LEAD" },
];

export default function Home() {
  return (
    <div className="home">

      {/* HEADER */}
      <div className="home-header">
        <div>
          <h2>Customers</h2>
          <span>All Types • 11 of 2,337 contacts</span>
        </div>

        <div className="actions">
          <button><FilterIcon /></button>
          <button><GridIcon /></button>
          <button><SearchIcon /></button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid">
        {clientes.map((c, i) => (
          <Card key={i} nome={c.nome} tipo={c.tipo} />
        ))}
      </div>

    </div>
  );
}
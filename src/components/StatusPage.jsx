export default function StatusPage({ icon, title, subtitle }) {
  return (
    <div style={styles.container}>
      <img src={icon} alt="status icon" style={styles.icon} />

      <h1 style={styles.title}>{title}</h1>

      {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f0f0f",
    color: "#fff",
    textAlign: "center",
    padding: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: "28px",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: "16px",
    opacity: 0.7,
  },
};
import StatusPage from "../components/StatusPage";

export default function Offline() {
  return (
    <StatusPage
      icon="/assets/icons/offline.png"
      title="Servidor desconectado"
      subtitle="Tentando reconectar com o servidor..."
    />
  );
}
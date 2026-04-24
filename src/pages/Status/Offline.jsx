import StatusPage from "../components/StatusPage";
import offlineIcon from "../../assets/icons/offline.png";

export default function Offline() {
  return (
    <StatusPage
      icon={offlineIcon}
      title="Servidor desconectado"
      subtitle="Tentando reconectar com o servidor..."
    />
  );
}
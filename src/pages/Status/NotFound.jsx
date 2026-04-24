import StatusPage from "../components/StatusPage";
import notFoundIcon from "../../assets/icons/404.png";

export default function NotFound() {
  return (
    <StatusPage
      icon={notFoundIcon}
      title="Página não encontrada"
      subtitle="Verifique o link ou volte para a página inicial"
    />
  );
}
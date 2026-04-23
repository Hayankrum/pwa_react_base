import StatusPage from "../components/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      icon="/assets/icons/404.png"
      title="Página não encontrada"
      subtitle="Verifique o link ou volte para a página inicial"
    />
  );
}
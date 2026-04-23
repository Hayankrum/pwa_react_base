import StatusPage from "../components/StatusPage";

export default function Loading() {
  return (
    <StatusPage
      icon="/assets/icons/loading.gif"
      title="Coletando dados do servidor..."
      subtitle="Isso pode levar alguns segundos"
    />
  );
}
import StatusPage from "../components/StatusPage";
import loadingIcon from "../../assets/icons/loading.gif";

export default function Loading() {
  return (
    <StatusPage
      icon={loadingIcon}
      title="Coletando dados do servidor..."
      subtitle="Isso pode levar alguns segundos"
    />
  );
}
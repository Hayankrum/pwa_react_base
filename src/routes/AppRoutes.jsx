import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";

// páginas normais
import Pagina1 from "../pages/telas/Pagina1";
import Pagina2 from "../pages/telas/Pagina2";
import Pagina3 from "../pages/telas/Pagina3";
import Pagina4 from "../pages/telas/Pagina4";
import Pagina5 from "../pages/telas/Pagina5";

// status
import Offline from "../pages/Status/Offline"
import NotFound from "../pages/Status/NotFound"
import Loading from "../pages/Status/Loading"

export default function AppRoutes() {
  return (
    <Routes>
      
      {/* LAYOUT PRINCIPAL */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="pagina1" element={<Pagina1 />} />
        <Route path="pagina2" element={<Pagina2 />} />
        <Route path="pagina3" element={<Pagina3 />} />
        <Route path="pagina4" element={<Pagina4 />} />
        <Route path="pagina5" element={<Pagina5 />} />


      {/* status */}
      <Route path="/offline" element={<Offline />} />
      <Route path="/loading" element={<Loading />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

      </Route>

      {/* FORA DO LAYOUT */}

    </Routes>
  );
}
import { BrowserRouter, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import AppRoutes from "./routes/AppRoutes"

// 🔥 Componente interno (tem acesso ao navigate)
function AppContent() {
  const navigate = useNavigate()

  useEffect(() => {
    function handleOffline() {
      console.log("📵 Offline")
      navigate("/offline")
    }

    function handleOnline() {
      console.log("🌐 Online")
      navigate("/")
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [navigate])

  return <AppRoutes />
}

// 🔥 App principal
export default function App() {
  return (
    <BrowserRouter basename="/pwa_react_base/">
      <AppContent />
    </BrowserRouter>
  )
}
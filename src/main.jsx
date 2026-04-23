import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"

// 🔥 PWA register avançado
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    const ok = confirm("Nova versão disponível. Atualizar agora?")
    if (ok) updateSW(true)
  },

  onOfflineReady() {
    console.log("🔥 App pronto para uso offline")
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
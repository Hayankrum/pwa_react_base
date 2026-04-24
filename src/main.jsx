import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"

// 🔥 PWA - atualização automática SEM prompt
import { registerSW } from 'virtual:pwa-register'

// força atualizar sempre que tiver nova versão
registerSW({
  immediate: true,

  onOfflineReady() {
    console.log("🔥 App pronto para uso offline")
  },

  onRegistered(swRegistration) {
    console.log("✅ Service Worker registrado:", swRegistration)
  },

  onRegisterError(error) {
    console.error("❌ Erro ao registrar SW:", error)
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
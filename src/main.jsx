import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"

// 🔥 PWA - Sistema de controle do worker
import { registerSW } from 'virtual:pwa-register'

// Sistema de controle do service worker
registerSW({
  immediate: true,

  onOfflineReady() {
    console.log("🔥 App pronto para uso offline")
  },

  onRegistered(swRegistration) {
    console.log("✅ Service Worker registrado", swRegistration)
  },

  onRegisterError(error) {
    console.error("❌ Erro ao registrar SW", error)
  }
})

console.log("🚀 Django Blog PWA inicializado")

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
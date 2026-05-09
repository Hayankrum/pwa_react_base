// Logger otimizado para desenvolvimento e produção

const isDev = import.meta.env.DEV

class Logger {
  constructor() {
    this.levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    }
    
    this.currentLevel = isDev ? this.levels.DEBUG : this.levels.ERROR
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toLocaleTimeString()
    const prefix = `[${timestamp}] ${level}:`
    
    if (data) {
      return [`${prefix} ${message}`, data]
    }
    return [`${prefix} ${message}`]
  }

  error(message, data = null) {
    if (this.currentLevel >= this.levels.ERROR) {
      console.error(...this.formatMessage('ERROR', message, data))
    }
  }

  warn(message, data = null) {
    if (this.currentLevel >= this.levels.WARN) {
      console.warn(...this.formatMessage('WARN', message, data))
    }
  }

  info(message, data = null) {
    if (this.currentLevel >= this.levels.INFO) {
      console.info(...this.formatMessage('INFO', message, data))
    }
  }

  debug(message, data = null) {
    if (this.currentLevel >= this.levels.DEBUG) {
      console.log(...this.formatMessage('DEBUG', message, data))
    }
  }

  // Métodos específicos para a aplicação
  api(method, url, status, data = null) {
    if (isDev) {
      const emoji = status >= 200 && status < 300 ? '✅' : status >= 400 ? '❌' : '⚠️'
      console.log(`${emoji} API ${method} ${url} (${status})`, data || '')
    }
  }

  auth(action, success = true) {
    if (isDev) {
      const emoji = success ? '🔓' : '🔒'
      console.log(`${emoji} Auth: ${action}`)
    }
  }

  navigation(from, to) {
    if (isDev) {
      console.log(`🧭 Navigation: ${from} → ${to}`)
    }
  }

  theme(action, theme) {
    if (isDev) {
      console.log(`🎨 Theme: ${action} → ${theme}`)
    }
  }

  // Limpar console em desenvolvimento
  clear() {
    if (isDev) {
      console.clear()
      console.log('🧹 Console limpo - PWA React Base')
    }
  }
}

export default new Logger()

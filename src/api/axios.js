import axios from "axios";
import logger from "../utils/logger";

// Obter URL da API das configurações ou usar padrão
const getApiUrl = () => {
  const settings = localStorage.getItem('appSettings');
  if (settings) {
    const parsed = JSON.parse(settings);
    return parsed.apiUrl || "http://127.0.0.1:8000/api/v1/";
  }
  return "http://127.0.0.1:8000/api/v1/";
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000, // 10 segundos timeout
});

// Interceptor de requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Só definir Content-Type como JSON se não for FormData
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  
  return config;
}, (error) => {
  logger.error('Request error:', error);
  return Promise.reject(error);
});

// Interceptor de resposta
api.interceptors.response.use(
  (response) => {
    // Log de requisições bem-sucedidas em desenvolvimento
    logger.api(response.config.method?.toUpperCase(), response.config.url, response.status);
    return response;
  },
  (error) => {
    // Tratamento melhorado de erros
    if (error.code === 'ERR_NETWORK') {
      logger.error('🔴 API não está respondendo - verifique se o servidor Django está rodando');
      error.message = 'Servidor indisponível. Verifique a conexão com a API.';
    } else if (error.response) {
      // Erros do servidor (4xx, 5xx)
      const status = error.response.status;
      logger.error(`🔴 Erro ${status}:`, error.response.data);
      
      if (status === 401) {
        // Token expirado ou inválido
        logger.warn('Token expirado - redirecionando para login');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        window.location.href = '/pwa_react_base/login';
      } else if (status === 403) {
        error.message = 'Acesso negado. Sem permissão para esta ação.';
      } else if (status === 404) {
        error.message = 'Recurso não encontrado na API.';
      } else if (status >= 500) {
        error.message = 'Erro interno do servidor. Tente novamente mais tarde.';
      }
    } else if (error.request) {
      // Requisição feita mas sem resposta
      logger.error('🔴 Sem resposta do servidor');
      error.message = 'Sem resposta do servidor. Verifique sua conexão.';
    }
    
    return Promise.reject(error);
  }
);

export default api;
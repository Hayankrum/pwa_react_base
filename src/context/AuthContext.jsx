import { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../api/auth";

export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getProfile();
          setUser(currentUser);
        } catch (error) {
          console.error("Failed to refresh user data:", error);
          await authService.logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  async function login(email, password) {
    try {
      const { user: userData } = await authService.login(email, password);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Erro ao fazer login" 
      };
    }
  }

  async function register(email, password, nome) {
    try {
      const { user: userData } = await authService.register(email, password, nome);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Erro ao registrar" 
      };
    }
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  async function updateProfile(data) {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Erro ao atualizar perfil" 
      };
    }
  }

  async function changePassword(currentPassword, newPassword) {
    try {
      await authService.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Erro ao alterar senha" 
      };
    }
  }

  async function deleteAccount(currentPassword) {
    try {
      await authService.deleteAccount(currentPassword);
      await authService.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || "Erro ao deletar conta" 
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
        isAuthenticated: authService.isAuthenticated(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
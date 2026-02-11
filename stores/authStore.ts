import { create } from "zustand";
import {
    limparSessao,
    obterSessao,
    salvarSessao,
} from "@/storage/devocionalStorage";
import type { Sessao } from "@/types";

interface AuthState {
  isAuthenticated: boolean;
  sessao: Sessao | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  login: (sessao: Sessao) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  sessao: null,
  isLoading: true,

  checkSession: async () => {
    try {
      const sessao = await obterSessao();
      set({
        isAuthenticated: !!sessao,
        sessao,
        isLoading: false,
      });
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      set({
        isAuthenticated: false,
        sessao: null,
        isLoading: false,
      });
    }
  },

  login: async (sessao: Sessao) => {
    try {
      await salvarSessao(sessao);
      set({
        isAuthenticated: true,
        sessao,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await limparSessao();
      set({
        isAuthenticated: false,
        sessao: null,
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  },
}));

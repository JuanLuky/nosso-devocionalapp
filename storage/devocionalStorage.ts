import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Sessao } from "@/types";

const SESSAO_KEY = "@nosso_devocional:sessao";

export const salvarSessao = async (sessao: Sessao): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSAO_KEY, JSON.stringify(sessao));
  } catch (error) {
    console.error("Erro ao salvar sessão:", error);
    throw error;
  }
};

export const obterSessao = async (): Promise<Sessao | null> => {
  try {
    const sessao = await AsyncStorage.getItem(SESSAO_KEY);
    return sessao ? JSON.parse(sessao) : null;
  } catch (error) {
    console.error("Erro ao obter sessão:", error);
    return null;
  }
};

export const limparSessao = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSAO_KEY);
  } catch (error) {
    console.error("Erro ao limpar sessão:", error);
    throw error;
  }
};

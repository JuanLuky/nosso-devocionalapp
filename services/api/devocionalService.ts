import type { CriarDevocionalDTO, Devocional } from "@/types";
import { api } from "./api";

export const buscarDevocional = async (
  codigoCasal: string,
  usuario: string,
): Promise<Devocional> => {
  try {
    const response = await api.get("/devocional", {
      params: { codigoCasal, usuario },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar devocional:", error);
    throw error;
  }
};

export const criarDevocional = async (
  data: CriarDevocionalDTO,
): Promise<Devocional> => {
  try {
    const response = await api.post("/devocional", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar devocional:", error);
    throw error;
  }
};

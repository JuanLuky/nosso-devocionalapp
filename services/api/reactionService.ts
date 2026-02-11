import type { ReagirDTO } from "@/types";
import { api } from "./api";

export const reagir = async (data: ReagirDTO): Promise<void> => {
  try {
    await api.post("/reacoes", data);
  } catch (error) {
    console.error("Erro ao reagir:", error);
    throw error;
  }
};

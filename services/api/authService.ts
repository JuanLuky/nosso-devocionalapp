import axios from "axios";
import { api } from "./api";

export interface LoginDTO {
  codigoCasal: string;
  usuario: string;
}

export interface LoginResponse {
  codigoCasal: string;
  dataCriacao: string;
}

export const login = async (data: LoginDTO): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/casais/entrar", data);
    return response.data;
  } catch (error) {
    console.log("LOG DE ERRO API:", error); // Adicione isso temporariamente
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Erro ao fazer login. Verifique suas credenciais.",
      );
    }
    throw new Error("Erro de conexão. Verifique sua internet.");
  }
};

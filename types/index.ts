export type TipoReacao = "CORACAO" | "AMEM" | "FOGO";

export interface Devocional {
  id: number;
  versiculo: string;
  referencia: string;
  autor: string;
  data: string;
  mensagemPadrao: boolean;

  contagemReacoes: {
    CORACAO: number;
    AMEM: number;
    FOGO: number;
  };
  minhaReacao: TipoReacao | null;
}

export interface Sessao {
  usuario: string;
  codigoCasal: string;
}

export interface CriarDevocionalDTO {
  codigoCasal: string;
  autor: string;
  versiculo: string;
  referencia: string;
}

export interface ReagirDTO {
  devocionalId: number;
  autor: string;
  tipoReacao: TipoReacao;
}

export interface WebSocketPayload {
  devocional: Devocional;
  remetente: string;
  tipo: string;
}

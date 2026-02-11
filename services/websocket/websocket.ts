// @ts-ignore
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import type { WebSocketPayload } from '@/types';

const WS_URL = process.env.EXPO_PUBLIC_WS_URL;
// exemplo: http://192.168.0.106:8080/ws

let stompClient: Client | null = null;

export const conectarWebSocket = (
    codigoCasal: string,
    onMessage: (payload: WebSocketPayload) => void
) => {
  console.log('🔌 Conectando SockJS + STOMP:', WS_URL);

  stompClient = new Client({
    webSocketFactory: () => new SockJS(WS_URL),
    reconnectDelay: 5000,
    debug: (msg) => console.log('🧠 STOMP:', msg),

    onConnect: () => {
      console.log('✅ STOMP conectado');

      stompClient?.subscribe(
          `/topic/casal/${codigoCasal}`,
          (message: IMessage) => {
            const payload = JSON.parse(message.body);
            console.log('📩 WS recebido:', payload);
            onMessage(payload);
          }
      );
    },

    onStompError: (frame) => {
      console.error('❌ Erro STOMP:', frame.headers['message']);
    },
  });

  stompClient.activate();
};

export const desconectarWebSocket = () => {
  if (stompClient) {
    console.log('🔌 Desconectando STOMP');
    stompClient.deactivate();
    stompClient = null;
  }
};

export const isConnecteds = () => {
  return stompClient?.connected ?? false;
};

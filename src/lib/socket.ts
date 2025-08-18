'use client';

import { io, Socket } from 'socket.io-client';
import { env } from './env';

let socket: Socket;

export const initSocket = () => {
  const apiUrl = env.NEXT_PUBLIC_API_URL || '';
  const socketUrl = apiUrl.replace(/\/api\/?$/, '');
  socket = io(socketUrl, {
    auth: {
      token: {
        jwt: localStorage.getItem('token'),
      },
    },
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initSocket first.');
  }

  return socket;
};

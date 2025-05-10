"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatEventType, RoomType } from '@/types/socket';
import { toast } from 'react-hot-toast';

interface WebSocketContextType {
  socket: Socket | null;
  sendMessage: (message: any) => void;
  isConnected: boolean;
  authError: boolean;
  
  // Chat specific methods
  joinChatRoom: (roomId: string, roomType: string) => void;
  leaveChatRoom: (roomId: string, roomType: string) => void;
  sendChatMessage: (message: any) => void;
  sendTypingIndicator: (roomId: string, roomType: string, isTyping: boolean) => void;
  markMessagesAsRead: (roomId: string, roomType: string, messageIds: string[]) => void;
}

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  sendMessage: () => {},
  isConnected: false,
  authError: false,
  joinChatRoom: () => {},
  leaveChatRoom: () => {},
  sendChatMessage: () => {},
  sendTypingIndicator: () => {},
  markMessagesAsRead: () => {},
});

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io('http://localhost:4000', {
      withCredentials: true, // Enable sending cookies with WebSocket handshake
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
      setAuthError(false);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error, error.message);
      setIsConnected(false);
      
      // Check if it's an auth error
      if (error.message && (
          error.message.includes('Authentication error') || 
          error.message.includes('auth') || 
          error.message.includes('token') || 
          error.message.includes('unauthorized')
        )) {
        setAuthError(true);
        toast.error('Authentication required for realtime updates');
      }
    });

    socketInstance.on('error', (error: any) => {
      console.error('Socket error:', error);
      if (error.type === 'UnauthorizedError' || error.code === 'unauthorized') {
        setAuthError(true);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = (message: any) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  // Chat specific methods
  const joinChatRoom = (roomId: string, roomType: string) => {
    if (socket) {
      socket.emit(ChatEventType.JOIN_ROOM, { roomId, roomType });
    }
  };

  const leaveChatRoom = (roomId: string, roomType: string) => {
    if (socket) {
      socket.emit(ChatEventType.LEAVE_ROOM, { roomId, roomType });
    }
  };

  const sendChatMessage = (message: any) => {
    if (socket) {
      console.log("Sending message via websocket:", message);
      
      // Generate a message ID if none provided
      if (!message.messageId) {
        message.messageId = `msg_${Date.now()}`;
      }
      
      // Store the timestamp
      message.timestamp = new Date();
      
      socket.emit(ChatEventType.SEND_MESSAGE, message);
    }
  };

  const sendTypingIndicator = (roomId: string, roomType: string, isTyping: boolean) => {
    if (socket) {
      const eventType = isTyping ? ChatEventType.TYPING : ChatEventType.STOP_TYPING;
      socket.emit(eventType, { roomId, roomType });
    }
  };

  const markMessagesAsRead = (roomId: string, roomType: string, messageIds: string[]) => {
    if (socket) {
      socket.emit(ChatEventType.READ_MESSAGES, { roomId, roomType, messageIds });
    }
  };

  return (
    <WebSocketContext.Provider value={{ 
      socket, 
      sendMessage, 
      isConnected,
      authError, 
      joinChatRoom,
      leaveChatRoom,
      sendChatMessage,
      sendTypingIndicator,
      markMessagesAsRead
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext); 
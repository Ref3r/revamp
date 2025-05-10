// Socket event types for chat
export enum ChatEventType {
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  SEND_MESSAGE = 'send_message',
  RECEIVE_MESSAGE = 'receive_message',
  TYPING = 'typing',
  STOP_TYPING = 'stop_typing',
  READ_MESSAGES = 'read_messages',
  USER_ONLINE = 'user_online',
  USER_OFFLINE = 'user_offline',
  ERROR = 'error'
}

// Room types
export enum RoomType {
  DIRECT = 'direct',
  COMMUNITY = 'community'
}

// Message interfaces
export interface SocketMessage {
  messageId?: string;
  content: string;
  senderId: string;
  senderName?: string;
  senderPicture?: string;
  roomId: string;
  roomType: RoomType;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

export interface TypingIndicator {
  userId?: string;
  userName?: string;
  roomId: string;
  roomType: RoomType;
  isTyping?: boolean;
}

export interface ReadReceipt {
  userId?: string;
  roomId: string;
  roomType: RoomType;
  messageIds: string[];
  timestamp?: Date;
}

export interface RoomAction {
  roomId: string;
  roomType: RoomType;
} 
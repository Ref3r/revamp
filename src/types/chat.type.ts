export interface DirectChatResponse {
  userId: string;
  userName: string;
  profilePicture: string;
  lastSeen: Date;
  online: boolean;
  lastMessage: Message;
  messages: Message[];
}

export interface Message {
  _id: string;
  sender: Recipient;
  recipient: Recipient;
  content: string;
  type: Type;
  chatType: ChatType;
  readBy: any[];
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export enum ChatType {
  Direct = "direct",
}

export interface Recipient {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
}

export enum Type {
  Text = "text",
}

export interface IMessage {
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface IFriend {
  id: number;
  name: string;
  profilePicture: string;
  status: string;
  lastMessage: IMessage;
}

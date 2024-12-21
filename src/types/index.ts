export interface IMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export interface IFriend {
  id: number;
  name: string;
  profilePicture: string;
  status: string;
  lastMessage: IMessage;
}

export interface IUserChat {
  userId: number;
  chatHistory: IMessage[];
}

export interface IDraftMessage {
  userId: number;
  message: string;
}

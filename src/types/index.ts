export interface IMessage {
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

export interface IChat {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

export interface IUserChat {
  userId: number;
  chatHistory: IChat[];
}

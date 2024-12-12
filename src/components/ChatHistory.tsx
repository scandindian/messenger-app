import { useState, useEffect, FC } from "react";
import styled from "styled-components";
import { IFriend, IUserChat } from "../types";
import MessageList from "./MessageList";

const FullChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 1rem;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  background-color: #eee;
  border: 1px solid #e0e0e0;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #a9a9a9;
  }
`;

const SendButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoChatSelectedMessage = styled.h2`
  padding: 0 1rem;
`;

interface ChatHistoryProps {
  selectedUserId: number | null;
  chatHistoryInfo: IUserChat[];
  friendsInfo: IFriend[];
  setChatHistoryInfo: (updatedChatHistory: IUserChat[]) => void;
}

const ChatHistory: FC<ChatHistoryProps> = ({
  selectedUserId,
  chatHistoryInfo,
  friendsInfo,
  setChatHistoryInfo,
}) => {
  const [selectedChat, setSelectedChat] = useState<IUserChat | undefined>(
    chatHistoryInfo.find((chat) => chat.userId === selectedUserId)
  );
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUserId !== null) {
      setSelectedChat(
        chatHistoryInfo.find((chat) => chat.userId === selectedUserId)
      );
    }
  }, [selectedUserId, chatHistoryInfo]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const updatedChat = {
      ...selectedChat,
      chatHistory: [
        ...selectedChat.chatHistory,
        {
          id: Date.now(),
          content: newMessage.trim(),
          timestamp: new Date().toISOString(),
          sender: "me",
        },
      ],
    };

    const updatedChatHistory = chatHistoryInfo.map((chat) =>
      chat.userId === selectedUserId ? updatedChat : chat
    );

    setChatHistoryInfo(updatedChatHistory);
    setNewMessage("");
  };

  if (!selectedUserId || !selectedChat) {
    return (
      <NoChatSelectedMessage>
        Select a friend to start chatting
      </NoChatSelectedMessage>
    );
  }

  return (
    <FullChatContainer>
      <h2>
        Chat with {friendsInfo.find((f) => f.id === selectedUserId)?.name}
      </h2>
      <MessageList selectedChat={selectedChat} />
      <MessageInputContainer>
        <MessageInput
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </MessageInputContainer>
    </FullChatContainer>
  );
};

export default ChatHistory;

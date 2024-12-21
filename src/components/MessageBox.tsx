import { useState, FC, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { IDraftMessage, IUserChat } from "../types";

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

interface MessageBoxProps {
  selectedUserId: number | null;
  selectedChat: IUserChat | undefined;
  chatHistoryInfo: IUserChat[];
  setChatHistoryInfo: (updatedChatHistory: IUserChat[]) => void;
  draftMessages: IDraftMessage[];
  setDraftMessages: (updatedDraftMessages: IDraftMessage[]) => void;
}

const MessageBox: FC<MessageBoxProps> = ({
  selectedUserId,
  selectedChat,
  chatHistoryInfo,
  setChatHistoryInfo,
  draftMessages,
  setDraftMessages,
}) => {
  const [newMessage, setNewMessage] = useState<string | undefined>("");

  useEffect(() => {
    const selectedDraftMessage = draftMessages.find(
      (userMessage) => userMessage.userId === selectedUserId
    );
    setNewMessage(selectedDraftMessage?.message);
  }, [draftMessages, selectedUserId]);

  const handleSendMessage = () => {
    if (!newMessage?.trim() || !selectedChat) return;

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
    if (selectedUserId === null) {
      return;
    }
    const newDraftMessage: IDraftMessage = {
      userId: selectedUserId,
      message: "",
    };
    const updatedMessages = draftMessages.map((message) => {
      if (message.userId === selectedUserId) {
        return newDraftMessage;
      } else {
        return message;
      }
    });
    setDraftMessages(updatedMessages);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedUserId === null) {
      return;
    }
    const newDraftMessage: IDraftMessage = {
      userId: selectedUserId,
      message: e.target.value,
    };
    const updatedMessages = draftMessages.map((message) => {
      if (message.userId === selectedUserId) {
        return newDraftMessage;
      } else {
        return message;
      }
    });
    setDraftMessages(updatedMessages);
  };

  return (
    <MessageInputContainer>
      <MessageInput
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={handleMessageChange}
      />
      <SendButton onClick={handleSendMessage}>Send</SendButton>
    </MessageInputContainer>
  );
};

export default MessageBox;

import { FC } from "react";

import styled from "styled-components";
import { IUserChat } from "../types";

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #E0E0E0;
`;

const MessageHistory = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageItem = styled.li<{ $isMe: boolean }>`
  align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.$isMe ? "#E3F2FD" : "#F5F5F5")};
  color: ${(props) => (props.$isMe ? "#000" : "#333")};
  padding: 0.5rem;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word;
`;

const Timestamp = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #888;
`;

interface MessageListProps {
  selectedChat: IUserChat;
}

const MessageList: FC<MessageListProps> = ({ selectedChat }) => {
  return (
    <MessageListContainer>
      <MessageHistory>
        {selectedChat.chatHistory.map((message) => (
          <MessageItem key={message.id} $isMe={message.sender === "me"}>
            <p>{message.content}</p>
            <Timestamp>
              {new Date(message.timestamp).toLocaleString()}
            </Timestamp>
          </MessageItem>
        ))}
      </MessageHistory>
    </MessageListContainer>
  );
};

export default MessageList;

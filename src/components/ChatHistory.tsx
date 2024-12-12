import React, { useState } from "react";
import styled from "styled-components";
import chatHistoryData from "../data/chatHistoryData.json";
import friendsData from "../data/friendsData.json";

const FullChatContainer = styled.div`
  padding: 0 1rem;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li<{ $isMe: boolean }>`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => (props.$isMe ? "#d1ffd1" : "#f1f1f1")};
  align-self: ${(props) => (props.$isMe ? "flex-end" : "flex-start")};
  border-radius: 5px;
  max-width: 70%;
`;

const Timestamp = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #888;
`;

const ChatHistory: React.FC<{ selectedUserId: number | null }> = ({
  selectedUserId,
}) => {
  const [selectedChat, setSelectedChat] = useState(
    chatHistoryData.find((chat) => chat.userId === selectedUserId)
  );

  React.useEffect(() => {
    if (selectedUserId !== null) {
      setSelectedChat(
        chatHistoryData.find((chat) => chat.userId === selectedUserId)
      );
    }
  }, [selectedUserId]);

  if (!selectedUserId || !selectedChat) {
    return <p>Select a friend to start chatting</p>;
  }

  return (
    <FullChatContainer>
      <h2>
        Chat with {friendsData.find((f) => f.id === selectedUserId)?.name}
      </h2>
      <MessageList>
        {selectedChat.chatHistory.map((message) => (
          <MessageItem key={message.id} $isMe={message.sender === "me"}>
            <p>{message.content}</p>
            <Timestamp>
              {new Date(message.timestamp).toLocaleString()}
            </Timestamp>
          </MessageItem>
        ))}
      </MessageList>
    </FullChatContainer>
  );
};

export default ChatHistory;

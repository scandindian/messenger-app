import { useState, useEffect, FC } from "react";
import styled from "styled-components";
import { IDraftMessage, IFriend, IUserChat } from "../types";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";

const FullChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 1rem;
`;

const NoChatSelectedMessage = styled.h2`
  padding: 0 1rem;
`;

interface ChatHistoryProps {
  selectedUserId: number | null;
  chatHistoryInfo: IUserChat[];
  friendsInfo: IFriend[];
  setChatHistoryInfo: (updatedChatHistory: IUserChat[]) => void;
  draftMessages: IDraftMessage[];
  setDraftMessages: (updatedDraftMessages: IDraftMessage[]) => void;
}

const ChatHistory: FC<ChatHistoryProps> = ({
  selectedUserId,
  chatHistoryInfo,
  friendsInfo,
  setChatHistoryInfo,
  draftMessages,
  setDraftMessages,
}) => {
  const [selectedChat, setSelectedChat] = useState<IUserChat | undefined>(
    chatHistoryInfo.find((chat) => chat.userId === selectedUserId)
  );

  useEffect(() => {
    if (selectedUserId !== null) {
      setSelectedChat(
        chatHistoryInfo.find((chat) => chat.userId === selectedUserId)
      );
    }
  }, [selectedUserId, chatHistoryInfo]);

  // In case there is no friend
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
      <MessageBox
        selectedUserId={selectedUserId}
        selectedChat={selectedChat}
        setChatHistoryInfo={setChatHistoryInfo}
        chatHistoryInfo={chatHistoryInfo}
        draftMessages={draftMessages}
        setDraftMessages={setDraftMessages}
      />
    </FullChatContainer>
  );
};

export default ChatHistory;

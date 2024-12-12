import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatHistory from "./ChatHistory";
import FriendsList from "./FriendsList";
import friendsData from "../data/friendsData.json";
import chatHistoryData from "../data/chatHistoryData.json";
import { IFriend, IUserChat } from "../types";
import { geFriendsListChronologically } from "../utility";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const FriendsSection = styled.div`
  width: 250px;
  background-color: #333;
  padding: 1rem;
  color: white;
  overflow-y: auto;
`;

const ChatSection = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1rem;
  overflow-y: auto;
`;

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [friendsInfo, setFriendsInfo] = useState<IFriend[]>([]);
  const [chatHistoryInfo, setChatHistoryInfo] = useState<IUserChat[]>([]);

  useEffect(() => {
    setFriendsInfo(geFriendsListChronologically(friendsData));
    setChatHistoryInfo(chatHistoryData);
  }, []);

  return (
    <AppContainer>
      <FriendsSection>
        <FriendsList
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          friendsInfo={friendsInfo}
        />
      </FriendsSection>
      <ChatSection>
        <ChatHistory
          selectedUserId={selectedUserId}
          chatHistoryInfo={chatHistoryInfo}
          friendsInfo={friendsInfo}
          setChatHistoryInfo={setChatHistoryInfo}
        />
      </ChatSection>
    </AppContainer>
  );
};

export default App;

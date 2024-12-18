import { useEffect, useState, FC } from "react";
import styled from "styled-components";
import ChatHistory from "./ChatHistory";
import FriendsList from "./FriendsList";
import friendsData from "../data/friendsData.json";
import chatHistoryData from "../data/chatHistoryData.json";
import { IFriend, IUserChat } from "../types";
import { getFriendsListChronologically } from "../utility";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const FriendsSection = styled.div`
  width: 100%;
  background-color: #333;
  padding: 1rem;
  color: white;
  overflow-y: auto;

  @media screen and (min-width: 768px) {
    width: 250px;
  }
`;

const ChatSection = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1rem;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const App: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [friendsInfo, setFriendsInfo] = useState<IFriend[]>([]);
  const [chatHistoryInfo, setChatHistoryInfo] = useState<IUserChat[]>([]);

  useEffect(() => {
    setFriendsInfo(getFriendsListChronologically(friendsData));
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

import React, { useState } from "react";
import styled from "styled-components";
import ChatHistory from "./ChatHistory";
import FriendsList from "./FriendsList";

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
  background-color: #f1f1f1;
  padding: 1rem;
  overflow-y: auto;
`;

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <AppContainer>
      <FriendsSection>
        <FriendsList
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </FriendsSection>
      <ChatSection>
        <ChatHistory selectedUserId={selectedUserId} />
      </ChatSection>
    </AppContainer>
  );
};

export default App;

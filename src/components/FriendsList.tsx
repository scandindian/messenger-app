import React from "react";
import styled from "styled-components";
import friendsData from "../data/friendsData.json";

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: #fff;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #555;

  &:last-child {
    border-bottom: none;
  }
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FriendName = styled.span`
  font-weight: bold;
`;

const FriendStatus = styled.span`
  font-size: 0.85rem;
  color: #bbb;
`;

const FriendsList: React.FC = () => {
  return (
    <FriendsContainer>
      {friendsData.map((friend) => (
        <FriendItem key={friend.id}>
          <ProfilePicture
            src={friend.profilePicture}
            alt={`${friend.name}'s profile`}
          />
          <FriendInfo>
            <FriendName>{friend.name}</FriendName>
            <FriendStatus>{friend.status}</FriendStatus>
          </FriendInfo>
        </FriendItem>
      ))}
    </FriendsContainer>
  );
};

export default FriendsList;

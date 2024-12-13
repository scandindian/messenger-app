import { FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IFriend } from "../types";

const FriendItemContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  margin: 1rem 0 0 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#555" : "transparent"};

  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? "#555" : "#444")};
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

interface FriendItemProps {
  friend: IFriend;
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  selectedUserId: number | null;
}

const FriendItem: FC<FriendItemProps> = ({
  friend,
  setSelectedUserId,
  selectedUserId,
}) => {
  return (
    <FriendItemContainer
      key={friend.id}
      $isSelected={friend.id === selectedUserId}
      onClick={() => {
        setSelectedUserId(friend.id);
      }}
    >
      <ProfilePicture
        src={friend.profilePicture}
        alt={`${friend.name}'s profile`}
      />
      <FriendInfo>
        <FriendName>{friend.name}</FriendName>
        <FriendStatus>{friend.status}</FriendStatus>
      </FriendInfo>
    </FriendItemContainer>
  );
};

export default FriendItem;

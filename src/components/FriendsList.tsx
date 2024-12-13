import { useEffect, useState, Dispatch, SetStateAction, FC } from "react";
import styled from "styled-components";
import FriendItem from "./FriendItem";
import { IFriend } from "../types";

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
`;

const SearchBox = styled.input`
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  background-color: #222;
  color: #fff;
  
  &:focus {
    outline: none;
    border-color: #777;
  }

  @media screen and (max-width: 768px) {
    margin: 0;
    width: auto;
  }
`;

const FriendsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }
`;

const FriendPlaceholder = styled.p`
  color: #aaa;
  text-align: center;
  margin: 1rem 0;

  @media screen and (max-width: 768px) {
    margin: 1rem auto;
  }
`;


interface FriendsListProps {
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  selectedUserId: number | null;
  friendsInfo: IFriend[];
}

const FriendsList: FC<FriendsListProps> = ({
  setSelectedUserId,
  selectedUserId,
  friendsInfo,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friendsInfo);

  useEffect(() => {
    setFilteredFriends(
      friendsInfo.filter((friend) =>
        friend.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, friendsInfo]);

  useEffect(() => {
    if (filteredFriends.length > 0) {
      setSelectedUserId(filteredFriends[0].id);
    } else {
      setSelectedUserId(null);
    }
  }, [filteredFriends, setSelectedUserId]);

  return (
    <FriendsContainer>
      <SearchBox
        type="text"
        placeholder="Search friends..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <FriendsListContainer>
        {filteredFriends.map((friend) => (
          <FriendItem
            key={friend.id}
            friend={friend}
            setSelectedUserId={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        ))}
      </FriendsListContainer>
      {filteredFriends.length === 0 && (
        <FriendPlaceholder>No friends found.</FriendPlaceholder>
      )}
    </FriendsContainer>
  );
};

export default FriendsList;

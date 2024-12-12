import { useEffect, useState, Dispatch, SetStateAction, FC } from "react";
import styled from "styled-components";
import { geFriendsListChronologically } from "../utility";
import FriendItem from "./FriendItem";

const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
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
`;

interface FriendsListProps {
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  selectedUserId: number | null;
}

const friendsListData = geFriendsListChronologically();

const FriendsList: FC<FriendsListProps> = ({
  setSelectedUserId,
  selectedUserId,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friendsListData);

  useEffect(() => {
    setFilteredFriends(
      friendsListData.filter((friend) =>
        friend.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

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
      {filteredFriends.map((friend) => (
        <FriendItem
          friend={friend}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      ))}
      {filteredFriends.length === 0 && <p>No friends found.</p>}
    </FriendsContainer>
  );
};

export default FriendsList;

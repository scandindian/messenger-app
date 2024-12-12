import friendsData from "../data/friendsData.json";

export const geFriendsListChronologically = () => {
  return friendsData.sort(
    (a, b) =>
      new Date(b.lastMessage.timestamp).getTime() -
      new Date(a.lastMessage.timestamp).getTime()
  );
};

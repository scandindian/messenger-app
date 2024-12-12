import { IFriend } from "../types";

export const geFriendsListChronologically = (friendsData: IFriend[]) => {
  return friendsData.sort(
    (a, b) =>
      new Date(b.lastMessage.timestamp).getTime() -
      new Date(a.lastMessage.timestamp).getTime()
  );
};

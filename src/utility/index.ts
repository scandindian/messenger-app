import { IFriend } from "../types";

// Function to get the list of users based on chronological order of last message sent
export const getFriendsListChronologically = (friendsData: IFriend[]) => {
  return friendsData.sort(
    (a, b) =>
      new Date(b.lastMessage.timestamp).getTime() -
      new Date(a.lastMessage.timestamp).getTime()
  );
};

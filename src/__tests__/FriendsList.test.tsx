import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FriendsList from "../components/FriendsList";
import { IFriend } from "../types";
import { Dispatch, SetStateAction } from "react";

interface FriendItemProps {
  friend: IFriend;
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  selectedUserId: number | null;
}

vi.mock("../components/FriendItem", () => ({
  default: ({ friend, setSelectedUserId, selectedUserId }: FriendItemProps) => (
    <div
      onClick={() => setSelectedUserId(friend.id)}
      style={{
        backgroundColor: friend.id === selectedUserId ? "#555" : "transparent",
      }}
    >
      {friend.name}
    </div>
  ),
}));

describe("FriendsList Component", () => {
  const setSelectedUserId = vi.fn();
  const friendsInfo: IFriend[] = [
    {
      id: 1,
      name: "Alice Johnson",
      profilePicture: "https://picsum.photos/seed/alice/200",
      status: "online",
      lastMessage: {
        id: 103,
        sender: "me",
        content: "How about 7 PM?",
        timestamp: "2024-12-12T14:34:00Z",
      },
    },
    {
      id: 2,
      name: "Bob Smith",
      profilePicture: "https://picsum.photos/seed/bob/200",
      status: "offline",
      lastMessage: {
        id: 202,
        sender: "Bob Smith",
        content: "Sure, I'll send them in a bit.",
        timestamp: "2024-12-12T12:16:00Z",
      },
    },
  ];

  it("renders the list of friends correctly", () => {
    render(
      <FriendsList
        setSelectedUserId={setSelectedUserId}
        selectedUserId={null}
        friendsInfo={friendsInfo}
      />
    );

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
  });

  it("filters friends based on the search input", () => {
    render(
      <FriendsList
        setSelectedUserId={setSelectedUserId}
        selectedUserId={null}
        friendsInfo={friendsInfo}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search friends...");
    fireEvent.change(searchInput, { target: { value: "Alice" } });

    expect(screen.queryByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.queryByText("Bob Smith")).not.toBeInTheDocument();
  });

  it("selects the first friend when the filtered list changes", () => {
    render(
      <FriendsList
        setSelectedUserId={setSelectedUserId}
        selectedUserId={null}
        friendsInfo={friendsInfo}
      />
    );

    expect(setSelectedUserId).toHaveBeenCalledWith(1);

    const searchInput = screen.getByPlaceholderText("Search friends...");
    fireEvent.change(searchInput, { target: { value: "Bob" } });

    expect(setSelectedUserId).toHaveBeenCalledWith(2);
  });

  it("displays a placeholder when no friends match the search", () => {
    render(
      <FriendsList
        setSelectedUserId={setSelectedUserId}
        selectedUserId={null}
        friendsInfo={friendsInfo}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search friends...");
    fireEvent.change(searchInput, { target: { value: "David" } });

    expect(screen.getByText("No friends found.")).toBeInTheDocument();
  });

  it("calls setSelectedUserId when a friend is clicked", () => {
    render(
      <FriendsList
        setSelectedUserId={setSelectedUserId}
        selectedUserId={null}
        friendsInfo={friendsInfo}
      />
    );

    const friendItem = screen.getByText("Alice Johnson");
    fireEvent.click(friendItem);

    expect(setSelectedUserId).toHaveBeenCalledWith(1);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FriendItem from "../components/FriendItem";
import { IFriend } from "../types";

describe("FriendItem Component", () => {
  const mockSetSelectedUserId = vi.fn();

  const friend: IFriend = {
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
  };

  it("renders the friend's information correctly", () => {
    render(
      <FriendItem
        friend={friend}
        setSelectedUserId={mockSetSelectedUserId}
        selectedUserId={null}
      />
    );

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("online")).toBeInTheDocument();
    expect(screen.getByAltText("Alice Johnson's profile")).toBeInTheDocument();
  });

  it("calls setSelectedUserId when clicked", () => {
    render(
      <FriendItem
        friend={friend}
        setSelectedUserId={mockSetSelectedUserId}
        selectedUserId={null}
      />
    );

    const friendItem = screen.getByText("Alice Johnson");
    fireEvent.click(friendItem);

    expect(mockSetSelectedUserId).toHaveBeenCalledWith(1);
  });
});

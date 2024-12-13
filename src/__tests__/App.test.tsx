import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";
import { geFriendsListChronologically } from "../utility";
import { describe, it, expect, vi } from "vitest";

vi.mock("../utility", () => ({
  geFriendsListChronologically: vi.fn().mockReturnValue([
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
  ]),
}));

vi.mock("../data/friendsData.json", () => ({
  default: [
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
  ],
}));

vi.mock("../data/chatHistoryData.json", () => ({
  default: [
    {
      userId: 1,
      chatHistory: [
        {
          id: 101,
          sender: "me",
          content: "Hey, are we still on for tonight?",
          timestamp: "2024-12-12T14:30:00Z",
        },
        {
          id: 102,
          sender: "Alice Johnson",
          content: "Yes! What time works for you?",
          timestamp: "2024-12-12T14:32:00Z",
        },
        {
          id: 103,
          sender: "me",
          content: "How about 7 PM?",
          timestamp: "2024-12-12T14:34:00Z",
        },
      ],
    },
    {
      userId: 2,
      chatHistory: [
        {
          id: 201,
          sender: "me",
          content: "Can you send me the files?",
          timestamp: "2024-12-12T12:15:00Z",
        },
        {
          id: 202,
          sender: "Bob Smith",
          content: "Sure, I'll send them in a bit.",
          timestamp: "2024-12-12T12:16:00Z",
        },
      ],
    },
  ],
}));

describe("App Component", () => {
  it("renders the app correctly", async () => {
    render(<App />);

    const friendList = await screen.findByText("Alice Johnson");
    expect(friendList).toBeInTheDocument();
  });

  it("loads and displays chat history for selected user", async () => {
    render(<App />);

    const friend = await screen.findByText("Alice Johnson");
    fireEvent.click(friend);

    const message = await screen.findByText("Yes! What time works for you?");
    expect(message).toBeInTheDocument();
  });

  it("calls geFriendsListChronologically on render", async () => {
    render(<App />);

    expect(geFriendsListChronologically).toHaveBeenCalled();
  });

  it("renders the chat history safely", async () => {
    render(<App />);

    const friend = await screen.findByText("Alice Johnson");
    fireEvent.click(friend);

    const noMessages = screen.queryByText("No messages to display");
    expect(noMessages).toBeNull();
  });
});

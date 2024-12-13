import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChatHistory from "../components/ChatHistory";

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
      ],
    },
  ],
}));

describe("ChatHistory Component", () => {
  it("renders the 'Select a friend to start chatting' message when no user is selected", async () => {
    render(
      <ChatHistory
        selectedUserId={null}
        chatHistoryInfo={[]}
        friendsInfo={[]}
        setChatHistoryInfo={vi.fn()}
      />
    );

    const noChatMessage = await screen.findByText(
      "Select a friend to start chatting"
    );
    expect(noChatMessage).toBeInTheDocument();
  });

  it("renders chat history for the selected user", async () => {
    render(
      <ChatHistory
        selectedUserId={1}
        chatHistoryInfo={[
          {
            userId: 1,
            chatHistory: [
              {
                id: 101,
                sender: "me",
                content: "Hey, are we still on for tonight?",
                timestamp: "2024-12-12T14:30:00Z",
              },
            ],
          },
        ]}
        friendsInfo={[
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
        ]}
        setChatHistoryInfo={vi.fn()}
      />
    );

    const message = await screen.findByText(
      "Hey, are we still on for tonight?"
    );
    expect(message).toBeInTheDocument();
  });

  it("does not display chat history if no chat exists for the selected user", async () => {
    render(
      <ChatHistory
        selectedUserId={2}
        chatHistoryInfo={[
          {
            userId: 1,
            chatHistory: [
              {
                id: 101,
                sender: "me",
                content: "Hey, are we still on for tonight?",
                timestamp: "2024-12-12T14:30:00Z",
              },
            ],
          },
        ]}
        friendsInfo={[
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
        ]}
        setChatHistoryInfo={vi.fn()}
      />
    );

    const noChatMessage = screen.queryByText(
      "Hey, are we still on for tonight?"
    );
    expect(noChatMessage).toBeNull();
  });
});

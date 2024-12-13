import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MessageList from "../components/MessageList";
import { IUserChat } from "../types";

const selectedChat: IUserChat = {
  userId: 1,
  chatHistory: [
    {
      id: 101,
      sender: "me",
      content: "Hey, how are you?",
      timestamp: "2024-12-12T14:30:00Z",
    },
    {
      id: 102,
      sender: "friend",
      content: "I'm good, thanks! How about you?",
      timestamp: "2024-12-12T14:32:00Z",
    },
    {
      id: 103,
      sender: "me",
      content: "I'm doing great, let's catch up soon.",
      timestamp: "2024-12-12T14:35:00Z",
    },
  ],
};

describe("MessageList Component", () => {
  it("renders all messages from the selected chat", () => {
    render(<MessageList selectedChat={selectedChat} />);

    expect(screen.getByText("Hey, how are you?")).toBeInTheDocument();
    expect(
      screen.getByText("I'm good, thanks! How about you?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("I'm doing great, let's catch up soon.")
    ).toBeInTheDocument();
  });

  it("displays messages with correct alignment based on sender", () => {
    render(<MessageList selectedChat={selectedChat} />);

    const meMessage = screen.getByText("Hey, how are you?");
    expect(meMessage.closest("li")).toHaveStyle("align-self: flex-end");

    const friendMessage = screen.getByText("I'm good, thanks! How about you?");
    expect(friendMessage.closest("li")).toHaveStyle("align-self: flex-start");
  });

  it("applies correct styles based on sender", () => {
    render(<MessageList selectedChat={selectedChat} />);

    const meMessage = screen.getByText("Hey, how are you?");
    expect(meMessage.closest("li")).toHaveStyle("background-color: #E3F2FD");

    const friendMessage = screen.getByText("I'm good, thanks! How about you?");
    expect(friendMessage.closest("li")).toHaveStyle(
      "background-color: #F5F5F5"
    );
  });
});

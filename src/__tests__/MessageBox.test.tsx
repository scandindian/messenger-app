import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MessageBox from "../components/MessageBox";
import { IUserChat } from "../types";

vi.mock("date-fns", () => ({
  ...vi.importActual("date-fns"),
  Date: { now: vi.fn().mockReturnValue(1637940480000) },
}));

describe("MessageBox Component", () => {
  const setChatHistoryInfo = vi.fn();
  const selectedUserId = 1;

  const chatHistoryInfo: IUserChat[] = [
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
  ];

  it("renders the message input and send button", () => {
    render(
      <MessageBox
        selectedUserId={selectedUserId}
        selectedChat={chatHistoryInfo[0]}
        chatHistoryInfo={chatHistoryInfo}
        setChatHistoryInfo={setChatHistoryInfo}
      />
    );

    expect(
      screen.getByPlaceholderText("Type your message...")
    ).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("updates the new message state on input change", () => {
    render(
      <MessageBox
        selectedUserId={selectedUserId}
        selectedChat={chatHistoryInfo[0]}
        chatHistoryInfo={chatHistoryInfo}
        setChatHistoryInfo={setChatHistoryInfo}
      />
    );

    const input = screen.getByPlaceholderText("Type your message...");

    fireEvent.change(input, { target: { value: "Hello, Alice!" } });

    expect(input).toHaveValue("Hello, Alice!");
  });

  it("does not send an empty message", () => {
    render(
      <MessageBox
        selectedUserId={selectedUserId}
        selectedChat={chatHistoryInfo[0]}
        chatHistoryInfo={chatHistoryInfo}
        setChatHistoryInfo={setChatHistoryInfo}
      />
    );

    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(sendButton);

    expect(setChatHistoryInfo).not.toHaveBeenCalled();
  });

  it("sends a message and updates the chat history", () => {
    render(
      <MessageBox
        selectedUserId={selectedUserId}
        selectedChat={chatHistoryInfo[0]}
        chatHistoryInfo={chatHistoryInfo}
        setChatHistoryInfo={setChatHistoryInfo}
      />
    );

    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "How about 7 PM?" } });
    fireEvent.click(sendButton);

    expect(setChatHistoryInfo).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          userId: selectedUserId,
          chatHistory: expect.arrayContaining([
            expect.objectContaining({
              content: "How about 7 PM?",
              sender: "me",
            }),
          ]),
        }),
      ])
    );
  });

  it("clears the message input after sending a message", () => {
    render(
      <MessageBox
        selectedUserId={selectedUserId}
        selectedChat={chatHistoryInfo[0]}
        chatHistoryInfo={chatHistoryInfo}
        setChatHistoryInfo={setChatHistoryInfo}
      />
    );

    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(input, { target: { value: "How about 7 PM?" } });
    fireEvent.click(sendButton);

    expect(input).toHaveValue("");
  });
});

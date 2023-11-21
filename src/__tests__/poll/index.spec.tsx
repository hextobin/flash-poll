import { render, screen, waitFor } from "@testing-library/react";
import PollPage from "../../pages/poll/[index]";

jest.mock("../../services/pollService", () => ({
  getPoll: jest.fn().mockResolvedValue({
    id: 36,
    pollLinkID: "aafbd8a9-be7e-47a8-a710-b4109ed928f5",
    question: "sdfds",
    duration: 1,
    createdAt: "2023-11-20T20:41:07.628Z",
    updatedAt: "2023-11-20T20:41:07.628Z",
    options: [
      {
        id: 72,
        answer: "foo",
        votes: 0,
        pollId: 36,
        createdAt: "2023-11-20T20:41:07.628Z",
        updatedAt: "2023-11-20T20:41:07.628Z",
      },
      {
        id: 73,
        answer: "bar",
        votes: 1,
        pollId: 36,
        createdAt: "2023-11-20T20:41:07.628Z",
        updatedAt: "2023-11-20T20:41:07.628Z",
      },
      {
        id: 74,
        answer: "baz",
        votes: 2,
        pollId: 36,
        createdAt: "2023-11-20T20:41:07.628Z",
        updatedAt: "2023-11-20T20:41:07.628Z",
      },
    ],
  }),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      index: "123",
    },
  }),
}));

describe("PollPage", () => {
  it("renders question", async () => {
    render(<PollPage />);
    await waitFor(() => {
      const choices = screen.queryByTestId("question");
      expect(choices).toHaveTextContent("sdfds");
    });
  });

  it("renders multiple poll vote counts", async () => {
    render(<PollPage />);
    await waitFor(() => {
      const choices = screen.queryAllByTestId("poll-vote-count");
      expect(choices.length).toEqual(3);
    });
  });

  it("renders correct poll vote counts", async () => {
    render(<PollPage />);
    await waitFor(() => {
      const choices = screen.queryAllByTestId("poll-vote-count");
      expect(choices[0]).toHaveStyle("--value: 0;");
      expect(choices[1]).toHaveStyle("--value: 1;");
      expect(choices[2]).toHaveStyle("--value: 2;");
    });
  });

  it("renders multiple poll answers", async () => {
    render(<PollPage />);
    await waitFor(() => {
      const choices = screen.queryAllByTestId("poll-answer");
      expect(choices.length).toEqual(3);
    });
  });

  it("renders correct poll answers", async () => {
    render(<PollPage />);
    await waitFor(() => {
      const choices = screen.queryAllByTestId("poll-answer");
      expect(choices[0]).toHaveTextContent("foo");
      expect(choices[1]).toHaveTextContent("bar");
      expect(choices[2]).toHaveTextContent("baz");
    });
  });
});

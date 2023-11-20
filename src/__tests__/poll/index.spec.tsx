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
        votes: 0,
        pollId: 36,
        createdAt: "2023-11-20T20:41:07.628Z",
        updatedAt: "2023-11-20T20:41:07.628Z",
      },
      {
        id: 74,
        answer: "baz",
        votes: 0,
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
  it("renders multiple poll choices", async () => {
    render(<PollPage />);

    await waitFor(() => {
      const choices = screen.queryAllByTestId("poll-choice");
      expect(choices.length).toEqual(3);
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import PollPage from "../../src/app/poll/[slug]/page";

jest.mock("../../src/app/poll/_Services/pollService", () => ({
  fetchPollData: jest.fn().mockResolvedValue([
    { content: "AAA", votes: 4 },
    { content: "BBB", votes: 1 },
    { content: "CCC", votes: 2 },
  ]),
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

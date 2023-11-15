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
  it("renders between 2 to 4 poll choices", async () => {
    render(<PollPage />);

    await waitFor(() => {
      const choices = screen.queryAllByTestId("poll-choice");
      expect(choices.length).toBeGreaterThanOrEqual(2);
      expect(choices.length).toBeLessThanOrEqual(4);
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PollPage from "../../src/app/poll/[slug]/page";

const mockPollData = [
  { content: "AAA", votes: 4 },
  { content: "BBB", votes: 1 },
  { content: "CCC", votes: 2 },
  { content: "DDD", votes: 3 },
];

jest.mock("../../src/app/api/poll/route.ts", () => ({
  fetchPollData: jest.fn().mockResolvedValue(mockPollData),
}));

it("renders 2-4 poll choices", async () => {
  render(<PollPage />);
  const choices = await screen.findAllByTestId("poll-choice");
  expect(choices.length).toBeGreaterThanOrEqual(2);
  expect(choices.length).toBeLessThanOrEqual(4);
});

// it("displays current results for each choice", async () => {
//   render(<PollPage />);
//   const results = await screen.findAllByTestId("poll-result");
//   results.forEach((result) => {
//     expect(result).toHaveTextContent(/%$/); // Assuming results are displayed in percentage
//   });
// });

// it("allows voting on a choice", async () => {
//   render(<PollPage />);
//   const voteButtons = await screen.findAllByTestId("vote-button");
//   userEvent.click(voteButtons[0]);
//   expect(voteButtons[0]).toBeDisabled(); // Assuming the button is disabled after voting
// });

// it("updates results after voting", async () => {
//   render(<PollPage />);
//   const initialResult = (await screen.findAllByTestId("poll-result"))[0]
//     .textContent;

//   userEvent.click((await screen.findAllByTestId("vote-button"))[0]);

//   await waitFor(() => {
//     const updatedResult = screen.getByTestId("poll-result").textContent;
//     expect(updatedResult).not.toBe(initialResult);
//   });
// });

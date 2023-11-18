import React, { Answer } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PollCreationForm from "../pages";

jest.mock("../hooks/usePollCreationForm");

// TODO: Consider opening a PR for vercel/next. Evaluate if calling useRouter.prefetch is necessary for dynamically generated slugs, given the generator's proximity to the useRouter call.

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("PollCreationForm", () => {
  let mockHandleQuestionChange: jest.Mock<
    void,
    [React.ChangeEvent<HTMLTextAreaElement>]
  >;
  let mockHandleAnswerChange: jest.Mock<
    void,
    [string, React.ChangeEvent<HTMLInputElement>]
  >;
  let mockHandleDurationChange: jest.Mock<
    void,
    [React.ChangeEvent<HTMLInputElement>]
  >;
  let mockAddAnswer: jest.Mock<void, []>;
  let mockRemoveAnswer: jest.Mock<void, [string]>;
  let mockSetError: jest.Mock<void, [string | null]>;
  let mockSetAnswers: jest.Mock<void, [Answer[]]>;
  let mockSetQuestion: jest.Mock<void, [string]>;
  let mockSetDuration: jest.Mock<void, [number | null]>;

  beforeEach(() => {
    mockHandleQuestionChange = jest.fn();
    mockHandleAnswerChange = jest.fn();
    mockHandleDurationChange = jest.fn();
    mockAddAnswer = jest.fn();
    mockRemoveAnswer = jest.fn();
    mockSetError = jest.fn();
    mockSetAnswers = jest.fn();
    mockSetQuestion = jest.fn();
    mockSetDuration = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { usePollCreationForm } = require("../hooks/usePollCreationForm");
    usePollCreationForm.mockReturnValue({
      question: "",
      answers: [
        { id: "1", text: "" },
        { id: "2", text: "" },
      ],
      duration: 1,
      error: null,
      questionCharCount: 0,
      handleQuestionChange: mockHandleQuestionChange,
      handleAnswerChange: mockHandleAnswerChange,
      addAnswer: mockAddAnswer,
      removeAnswer: mockRemoveAnswer,
      handleDurationChange: mockHandleDurationChange,
      setError: mockSetError,
      setAnswers: mockSetAnswers,
      setQuestion: mockSetQuestion,
      setDuration: mockSetDuration,
    });
  });

  it("renders correctly", () => {
    render(<PollCreationForm />);
    expect(screen.getByText("Question:")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(3); // Two answer inputs plus one question input
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("allows adding answers", () => {
    render(<PollCreationForm />);
    fireEvent.click(screen.getByText("Add Answer"));
    expect(mockAddAnswer).toHaveBeenCalled();
  });

  it("handles question change", () => {
    render(<PollCreationForm />);
    const questionInput = screen.getByLabelText("Question:");
    fireEvent.change(questionInput, { target: { value: "New Question" } });
    expect(mockHandleQuestionChange).toHaveBeenCalled();
  });

  it("handles answer change", () => {
    render(<PollCreationForm />);
    const firstAnswerInput = screen.getAllByRole("textbox")[1]; // Assuming the first textbox is the question
    fireEvent.change(firstAnswerInput, { target: { value: "New Answer" } });
    expect(mockHandleAnswerChange).toHaveBeenCalled();
  });

  it("handles duration change", () => {
    render(<PollCreationForm />);
    const durationInput = screen.getByRole("spinbutton");
    fireEvent.change(durationInput, { target: { value: 10 } });
    expect(mockHandleDurationChange).toHaveBeenCalled();
  });

  it("submits the form with the correct data", () => {
    render(<PollCreationForm />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    // TODO: Replace with submit logic. Mock fetch or API call if necessary?
    // expect(mockSubmit).toHaveBeenCalled();
  });

  it("displays and dismisses error messages", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { usePollCreationForm } = require("../hooks/usePollCreationForm");
    usePollCreationForm.mockReturnValue({
      ...usePollCreationForm(),
      error: "Test Error",
    });

    render(<PollCreationForm />);
    expect(screen.getByText("Test Error")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Dismiss"));
    expect(mockSetError).toHaveBeenCalledWith(null);
  });

  it("clears the form on clear button click", () => {
    render(<PollCreationForm />);
    fireEvent.click(screen.getByText("Clear"));
    // TODO: Assert the state setters are called with initial values
  });
});

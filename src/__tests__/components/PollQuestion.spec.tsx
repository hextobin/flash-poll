import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PollQuestion } from "../../components/pollCreation/PollQuestion";

describe("PollQuestion", () => {
  const mockHandleQuestionChange = jest.fn();

  it("renders without crashing", () => {
    render(
      <PollQuestion
        question=""
        charCount={0}
        handleQuestionChange={mockHandleQuestionChange}
      />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the correct question in textarea", () => {
    const testQuestion = "What is your favorite color?";
    render(
      <PollQuestion
        question={testQuestion}
        charCount={testQuestion.length}
        handleQuestionChange={mockHandleQuestionChange}
      />
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe(testQuestion);
  });

  it("displays the correct character count", () => {
    const testQuestion = "What is your favorite color?";
    render(
      <PollQuestion
        question={testQuestion}
        charCount={testQuestion.length}
        handleQuestionChange={mockHandleQuestionChange}
      />
    );
    expect(screen.getByText(`${testQuestion.length}/250`)).toBeInTheDocument();
  });

  it("calls handleQuestionChange on textarea change", () => {
    render(
      <PollQuestion
        question=""
        charCount={0}
        handleQuestionChange={mockHandleQuestionChange}
      />
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New question" } });
    expect(mockHandleQuestionChange).toHaveBeenCalled();
  });

  it("textarea is marked as required", () => {
    render(
      <PollQuestion
        question=""
        charCount={0}
        handleQuestionChange={mockHandleQuestionChange}
      />
    );
    expect(screen.getByRole("textbox")).toBeRequired();
  });
});

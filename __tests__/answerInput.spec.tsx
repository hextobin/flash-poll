import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AnswerInput } from "../src/app/_Components/AnswerInput";

describe("AnswerInput Component", () => {
  test("renders input field and handles change", () => {
    const mockHandleAnswerChange = jest.fn();
    const mockRemoveAnswer = jest.fn();
    const answer = { id: "1", text: "Answer 1" };

    render(
      <AnswerInput
        answer={answer}
        index={0}
        removeAnswer={mockRemoveAnswer}
        handleAnswerChange={mockHandleAnswerChange}
      />
    );

    const input = screen.getByPlaceholderText("Answer 1");
    fireEvent.change(input, { target: { value: "Updated Answer" } });

    expect(mockHandleAnswerChange).toHaveBeenCalledWith("1", expect.anything());
    waitFor(() => {
      expect(input).toHaveValue("Updated Answer");
    });
  });

  test("renders remove button for answers after the first two", () => {
    const mockRemoveAnswer = jest.fn();
    const mockHandleAnswerChange = jest.fn();
    const answer = { id: "3", text: "Answer 3" };

    render(
      <AnswerInput
        answer={answer}
        index={2}
        handleAnswerChange={mockHandleAnswerChange}
        removeAnswer={mockRemoveAnswer}
      />
    );

    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);

    expect(mockRemoveAnswer).toHaveBeenCalledWith("3");
  });
});

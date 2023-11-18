import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DurationInput } from "../../components/DurationInput";

describe("DurationInput", () => {
  const mockHandleDurationChange = jest.fn();

  it("renders without crashing", () => {
    render(
      <DurationInput
        duration={10}
        handleDurationChange={mockHandleDurationChange}
      />
    );
    expect(screen.getByLabelText(/poll duration/i)).toBeInTheDocument();
  });

  it("displays the correct duration", () => {
    render(
      <DurationInput
        duration={15}
        handleDurationChange={mockHandleDurationChange}
      />
    );
    expect(screen.getByDisplayValue(/15/)).toBeInTheDocument();
  });

  it("calls handleDurationChange on input change", () => {
    render(
      <DurationInput
        duration={null}
        handleDurationChange={mockHandleDurationChange}
      />
    );
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "20" } });
    expect(mockHandleDurationChange).toHaveBeenCalled();
  });

  it("input value reflects the duration prop", () => {
    render(
      <DurationInput
        duration={30}
        handleDurationChange={mockHandleDurationChange}
      />
    );
    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    expect(input.value).toBe("30");
  });

  it("input field is required", () => {
    render(
      <DurationInput
        duration={null}
        handleDurationChange={mockHandleDurationChange}
      />
    );
    expect(screen.getByRole("spinbutton")).toBeRequired();
  });
});

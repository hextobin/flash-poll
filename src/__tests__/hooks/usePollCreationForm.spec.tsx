import { renderHook, act } from "@testing-library/react";
import { usePollCreationForm } from "../../hooks/usePollCreationForm";

describe("usePollCreationForm", () => {
  it("initial states are set correctly", () => {
    const { result } = renderHook(() => usePollCreationForm());

    expect(result.current.question).toBe("");
    expect(result.current.answers.length).toBe(2);
    expect(result.current.duration).toBe(1);
    expect(result.current.questionCharCount).toBe(0);
  });

  it("handles question change", () => {
    const { result } = renderHook(() => usePollCreationForm());
    act(() => {
      result.current.handleQuestionChange({
        target: { value: "New Question" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.question).toBe("New Question");
    expect(result.current.questionCharCount).toBe(12);
  });

  it("handles answer change", () => {
    const { result } = renderHook(() => usePollCreationForm());
    const initialAnswerId = result.current.answers[0].id;

    act(() => {
      result.current.handleAnswerChange(initialAnswerId, {
        target: { value: "New Answer" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.answers[0].text).toBe("New Answer");
  });

  it("adds an answer", () => {
    const { result } = renderHook(() => usePollCreationForm());

    act(() => {
      result.current.addAnswer();
    });

    expect(result.current.answers.length).toBe(3);
  });

  it("removes an answer", () => {
    const { result } = renderHook(() => usePollCreationForm());
    const initialAnswerId = result.current.answers[0].id;

    act(() => {
      result.current.removeAnswer(initialAnswerId);
    });

    expect(result.current.answers.length).toBe(1);
  });

  it("handles duration change", () => {
    const { result } = renderHook(() => usePollCreationForm());

    act(() => {
      result.current.handleDurationChange({
        target: { value: "10" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.duration).toBe(10);
  });
});

type Answer = {
  id: string;
  text: string;
};

type AnswerInputProps = {
  answer: Answer;
  index: number;
  handleAnswerChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  removeAnswer: (id: string) => void;
};

export const AnswerInput = ({
  answer,
  index,
  handleAnswerChange,
  removeAnswer,
}: AnswerInputProps) => (
  <div className="flex flex-wrap items-center gap-2 mt-2">
    <div className="flex w-full flex-col">
      <input
        type="text"
        id={`answer-${answer.id}`}
        value={answer.text}
        onChange={(e) => handleAnswerChange(answer.id, e)}
        placeholder={`Answer ${index + 1}`}
        className="input input-bordered"
        required={index < 2}
      />
      <span className="text-sm mt-1">{answer.text.length}/50</span>
    </div>
    {index >= 2 && removeAnswer && (
      <button
        type="button"
        onClick={() => removeAnswer(answer.id)}
        className="btn btn-error btn-outline"
      >
        Remove
      </button>
    )}
  </div>
);

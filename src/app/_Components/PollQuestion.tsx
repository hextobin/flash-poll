type PollQuestionProps = {
  question: string;
  charCount: number;
  handleQuestionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const PollQuestion = ({
  question,
  charCount,
  handleQuestionChange,
}: PollQuestionProps) => (
  <div className="flex flex-col">
    <textarea
      id="question"
      value={question}
      onChange={handleQuestionChange}
      className="input input-bordered w-full "
      required
    />
    <span className="text-sm mt-1">{charCount}/250</span>
  </div>
);

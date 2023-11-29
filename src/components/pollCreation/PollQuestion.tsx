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
      className="input input-bordered pt-2 w-full h-16"
      placeholder="What Color Should We Paint The Lobby?"
      required
    />
    <span className="text-sm mt-1">{charCount}/250</span>
  </div>
);

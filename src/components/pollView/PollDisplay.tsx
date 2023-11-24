import { CompletePoll } from "@/types/pollTypes";

interface PollDisplayProps {
  pollData: CompletePoll | null;
  pollResults: {
    content: string;
    votes: number;
  }[];
  putPoll: (voteTarget: string) => Promise<void>;
}

const PollDisplay = ({ pollData, pollResults, putPoll }: PollDisplayProps) => (
  <>
    <div
      className="m-auto mt-5 flex w-fit alert question-alert"
      data-testid="question"
    >
      <span className="text-white text-2xl m-auto">{pollData?.question}</span>
    </div>
    <div className="p-5 mt-20 mb-20 ml-5 mr-5 shadow-xl bg-white flex justify-around ">
      {pollResults.map((obj) => {
        return (
          <div className="flex flex-col items-center" key={obj.content}>
            <span className="countdown font-mono text-9xl">
              <span
                className="border"
                data-testid="poll-vote-count"
                style={{ "--value": obj.votes }}
              ></span>
            </span>
            <div
              className="alert mt-4 flex items-center justify-center border-black cursor-pointer"
              onClick={() => putPoll(obj.content)}
            >
              <span className="font-bold" data-testid="poll-answer">
                {obj.content}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </>
);

export default PollDisplay;

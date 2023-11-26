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
      data-testid="question"
      className="alert question-alert overflow-hidden mx-5 mt-20 max-w-[calc(100%-2rem)]"
    >
      <span className="text-white break-all text-4xl m-auto">
        {pollData?.question}
      </span>
    </div>

    <div className="p-5 mt-20 mb-20 ml-5 mr-5 shadow-xl bg-white flex flex-wrap justify-around ">
      {pollResults.map((obj) => {
        return (
          <div className="flex flex-col m-5 items-center" key={obj.content}>
            <span className="countdown font-mono text-9xl">
              <span
                className="border"
                data-testid="poll-vote-count"
                style={{ "--value": obj.votes }}
              ></span>
            </span>
            <div
              className="vote-button alert mt-4 flex items-center justify-center border-black cursor-pointer"
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

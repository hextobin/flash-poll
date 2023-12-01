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
    <h2
      data-testid="question"
      className="font-bold md:font-black mt-10 text-center text-4xl md:text-8xl "
    >
      {pollData?.question}
    </h2>
    <div className="text-center ping text-4xl font-bold mt-10 p-8 m-auto shadow-xl bg-slate-100 max-w-xs">
      Vote Below!
    </div>
    <div className="p-5 mt-10 mb-20 ml-5 mr-5 shadow-xl bg-white flex flex-wrap justify-around ">
      {pollResults.map((obj) => {
        return (
          <div className="flex flex-col m-5 items-center" key={obj.content}>
            <span className="countdown border border-black border-4 rounded-xl font-mono text-9xl">
              <span
                data-testid="poll-vote-count"
                style={{ "--value": obj.votes }}
              ></span>
            </span>
            <button
              className="btn btn-accent shadow-xl ping min-w-full mt-4 flex items-center justify-center cursor-pointer"
              onClick={() => putPoll(obj.content)}
            >
              <span className="font-bold" data-testid="poll-answer">
                {obj.content}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  </>
);

export default PollDisplay;

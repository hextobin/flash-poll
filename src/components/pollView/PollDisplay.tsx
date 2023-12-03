import { CompletePoll } from "@/types/pollTypes";
import useInterval from "../../hooks/useInterval";
import { useState } from "react";
import router from "next/router";

interface PollDisplayProps {
  pollData: CompletePoll | null;
  pollResults: {
    content: string;
    votes: number;
  }[];
  isVotingDisabled: boolean;
  putPoll: (voteTarget: string) => Promise<void>;
}

const PollDisplay = ({
  pollData,
  pollResults,
  putPoll,
  isVotingDisabled,
}: PollDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  const calculatedTimeLeft = () => {
    if (pollData) {
      const pollExpirationTime =
        new Date(pollData.createdAt).getTime() + pollData.duration;
      const currentTime = new Date().getTime();
      return pollExpirationTime - currentTime;
    }
    return null;
  };

  useInterval(() => {
    const millisecondsLeft = calculatedTimeLeft();
    if (millisecondsLeft && millisecondsLeft >= 0) {
      setTimeLeft({
        minutes: new Date(millisecondsLeft - 1000).getMinutes(),
        seconds: new Date(millisecondsLeft - 1000).getSeconds(),
      });
    } else {
      router.push("/pollExpired");
    }
  }, 1000);

  const displayVotingButtons = (obj: { content: string; votes: number }) => {
    return isVotingDisabled ? (
      <div className="font-black text-4xl">{obj.content}</div>
    ) : (
      <button
        className="btn btn-accent shadow-xl ping min-w-full mt-4 flex items-center justify-center cursor-pointer"
        onClick={() => putPoll(obj.content)}
      >
        <span className="font-black text-xl" data-testid="poll-answer">
          {obj.content}
        </span>
      </button>
    );
  };

  const displayCountdown = () => {
    return (
      <div className="inline-flex gap-5 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.minutes }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.seconds }}></span>
          </span>
          sec
        </div>
      </div>
    );
  };

  const displayInstructionsAndCountdown = () => {
    return (
      <div className="text-center ping text-4xl font-black p-8  shadow-xl bg-slate-100 rounded-lg border mb-5 mt-5 max-w-xs">
        {displayCountdown()}
        {isVotingDisabled ? (
          <div className="mt-5">You've Voted!</div>
        ) : (
          <div className="mt-5">Vote Now!</div>
        )}
      </div>
    );
  };

  return (
    <>
      <h2
        data-testid="question"
        className="font-black mt-10 text-center text-3xl md:text-8xl "
      >
        {pollData?.question}
      </h2>
      <div className="p-5 mt-10 mb-20 ml-5 mr-5 shadow-xl bg-white flex flex-wrap justify-around ">
        {displayInstructionsAndCountdown()}
        {pollResults.map((obj) => {
          return (
            <div className="flex flex-col m-5 items-center" key={obj.content}>
              <span className="countdown border border-black border-4 rounded-xl font-mono text-9xl">
                <span
                  data-testid="poll-vote-count"
                  style={{ "--value": obj.votes }}
                ></span>
              </span>
              {displayVotingButtons(obj)}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PollDisplay;

"use client";

import { useEffect, useState } from "react";
import pollService from "../../services/pollService";
import useInterval from "../../hooks/useInterval";
import { useRouter } from "next/router";
import { usePoll } from "../../hooks/usePoll";
import { CompletePoll } from "../../types/pollTypes";

const PollPage = () => {
  const [pollResults, setPollResults] = useState<
    { content: string; votes: number }[]
  >([]);
  const router = useRouter();
  const { error, setError, clearError } = usePoll();
  const linkID = router.query.index;

  // TODO: show errors

  // useInterval(() => {
  //   getData();
  // }, 1000);

  const parseAndSetPollData = (data: CompletePoll) => {
    const answersAndVotes = data.options.map((option) => {
      return { content: option.answer, votes: option.votes };
    });
    setPollResults(answersAndVotes);
  };

  const getData = async () => {
    if (typeof linkID === "string") {
      const data = await pollService.getPoll(linkID, setError);
      if (data) {
        parseAndSetPollData(data);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [linkID]);

  return (
    <div className="flex justify-center">
      <div className="p-5 mt-20 mb-20 ml-5 mr-5 w-full shadow-xl bg-white flex justify-between ">
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
              <div className="alert mt-4 flex items-center justify-center border-black">
                <span className="font-bold" data-testid="poll-answer">
                  {obj.content}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollPage;

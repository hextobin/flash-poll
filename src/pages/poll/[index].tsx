"use client";

import { useEffect, useState } from "react";
import pollService from "../../services/pollService";
import { useRouter } from "next/router";
import { usePoll } from "../../hooks/usePoll";
import { CompletePoll } from "../../types/pollTypes";

const PollPage = () => {
  const [pollResults, setPollResults] = useState<
    { content: string; votes: number }[]
  >([]);
  const [pollData, setPollData] = useState<CompletePoll | null>(null);
  const router = useRouter();
  const { setError } = usePoll();
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
    setPollData(data);
  };

  const getData = async () => {
    if (typeof linkID === "string") {
      const data: CompletePoll | null = await pollService.getPoll(
        linkID,
        setError
      );
      if (data) {
        parseAndSetPollData(data);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [linkID]);

  return (
    <>
      <div className="m-5 w-auto alert" data-testid="question">
        <span>{pollData?.question}</span>
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
              <div className="alert mt-4 flex items-center justify-center border-black">
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
};

export default PollPage;

"use client";

import { useEffect, useState } from "react";
import pollService from "../../services/pollService";
import { useRouter } from "next/router";
import { usePoll } from "../../hooks/usePoll";
import { CompletePoll } from "../../types/pollTypes";
import ErrorDisplay from "@/components/ErrorDisplay";

const PollPage = () => {
  const [pollResults, setPollResults] = useState<
    { content: string; votes: number }[]
  >([]);
  const [pollData, setPollData] = useState<CompletePoll | null>(null);
  const router = useRouter();
  const { setError, clearError, error } = usePoll();
  const linkID = router.query.index;

  const parseAndSetPollData = (data: CompletePoll) => {
    const answersAndVotes = data.options.map((option) => {
      return { content: option.answer, votes: option.votes };
    });
    answersAndVotes.sort((a, b) => {
      const nameA = a.content.toUpperCase();
      const nameB = b.content.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    setPollResults(answersAndVotes);
    setPollData(data);
  };

  const getPoll = async () => {
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

  const putPoll = async (voteTarget: string) => {
    if (typeof linkID === "string") {
      await pollService.putPoll(linkID, voteTarget, setError);
    }
  };

  useEffect(() => {
    getPoll();
  }, [linkID]);

  return (
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
      {error && <ErrorDisplay error={error!} clearError={clearError} />}
    </>
  );
};

export default PollPage;

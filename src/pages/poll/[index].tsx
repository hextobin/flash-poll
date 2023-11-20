"use client";

import { useEffect, useState } from "react";
import pollService from "../../services/pollService";
import useInterval from "../../hooks/useInterval";
import { useRouter } from "next/router";
import { usePoll } from "../../hooks/usePoll";

const PollPage = () => {
  const [pollResults, setPollResults] = useState<
    { content: string; votes: number }[]
  >([]);
  const router = useRouter();
  const { error, setError, clearError } = usePoll();
  const linkID = router.query.index;

  // useInterval(() => {
  //   getData();
  // }, 1000);

  const getData = async () => {
    if (typeof linkID === "string") {
      const data = await pollService.getPoll(linkID, setError);
      // TODO: Need to handle when data returned is []
      setPollResults(data);
    }
  };

  useEffect(() => {
    getData();
  }, [linkID]);

  return (
    <div className="flex justify-center">
      <div className="p-5 mt-20 mb-20 ml-5 mr-5 w-full shadow-xl bg-white ">
        <span className="countdown flex justify-between font-mono text-9xl">
          {pollResults.map((obj) => {
            return (
              <span
                className="border"
                data-testid="poll-choice"
                style={{ "--value": obj.votes }}
                key={obj.content}
              ></span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default PollPage;

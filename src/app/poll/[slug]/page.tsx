"use client";

import { useEffect, useState } from "react";
import pollService from "../_Services/pollService";

const PollPage = () => {
  const [pollResults, setPollResults] = useState<
    { content: string; votes: number }[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      const data = await pollService.fetchPollData();
      setPollResults(data);
    };
    getData();
  }, []);

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

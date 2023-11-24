import { useEffect, useState } from "react";
import pollService from "../../services/pollService";
import { useRouter } from "next/router";
import { usePoll } from "../../hooks/usePoll";
import { CompletePoll } from "../../types/pollTypes";
import ErrorDisplay from "@/components/ErrorDisplay";
import PollDisplay from "../../components/pollView/PollDisplay";

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
      {pollData && (
        <PollDisplay
          pollData={pollData}
          pollResults={pollResults}
          putPoll={putPoll}
        ></PollDisplay>
      )}
      {error && <ErrorDisplay error={error!} clearError={clearError} />}
    </>
  );
};

export default PollPage;

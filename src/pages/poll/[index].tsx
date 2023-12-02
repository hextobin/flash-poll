import { useEffect, useMemo, useState } from "react";
import pollService from "../../services/pollService";
import { useRouter } from "next/router";
import { usePoll } from "../../hooks/usePoll";
import { CompletePoll } from "../../types/pollTypes";
import ErrorDisplay from "@/components/ErrorDisplay";
import PollDisplay from "../../components/pollView/PollDisplay";

const PollPage = () => {
  const [pollData, setPollData] = useState<CompletePoll | null>(null);
  const router = useRouter();
  const { setError, clearError, error } = usePoll();
  const linkID = router.query.index;
  const [isVotingDisabled, setIsVotingDisabled] = useState<boolean>(false);

  const pollResults = useMemo(() => {
    if (!pollData) return [];
    return pollData.options
      .map((option) => ({
        content: option.answer,
        votes: option.votes,
      }))
      .sort((a, b) => {
        const nameA = a.content.toUpperCase();
        const nameB = b.content.toUpperCase();
        return nameA.localeCompare(nameB);
      });
  }, [pollData]);

  const getPoll = async () => {
    if (typeof linkID === "string") {
      const data: CompletePoll | null = await pollService.getPoll(
        linkID,
        setError
      );
      if (data) {
        setPollData(data);
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
    setIsVotingDisabled(localStorage.getItem(`poll-${linkID}`) === linkID);
  }, [linkID]);

  return (
    <>
      {pollData && (
        <PollDisplay
          pollData={pollData}
          pollResults={pollResults}
          putPoll={putPoll}
          isVotingDisabled={isVotingDisabled}
        ></PollDisplay>
      )}
      {error && <ErrorDisplay error={error!} clearError={clearError} />}
    </>
  );
};

export default PollPage;

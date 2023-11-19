import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { postPollSchema } from "../validations/pollValidationSchemas";
import { PostPoll, CreatePollData } from "../types/pollTypes";
import pollRepository from "../db/pollRepository";
import router from "next/router";

const pollService = {
  getPoll: async (): Promise<{ content: string; votes: number }[]> => {
    // try {
    //   const response = await fetch("/api/poll", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(poll),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to get poll results");
    //   }

    //   const resJSON = await response.json();
    // } catch (err) {
    //   if (err instanceof Error) {
    //     console.error(err);
    //     setError(err.message);
    //   } else {
    //     console.error("An unknown error occurred");
    //     setError("An unknown error occurred");
    //   }
    // }

    return Promise.resolve([{ content: "Hello World", votes: 5 }]);
  },
  GET: async () => {},
  postPoll: async (
    poll: {
      question: string;
      answers: string[];
      duration: number | null;
    },
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      const response = await fetch("/api/poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(poll),
      });

      if (!response.ok) {
        throw new Error("Failed to submit poll");
      }

      const resJSON = await response.json();
      router.push(`/poll/${resJSON.pollLink}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("An unknown error occurred");
        setError("An unknown error occurred");
      }
    }
  },
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const postPollData: PostPoll = await req.body;
      await postPollSchema.validate(postPollData);
      const pollLinkID = await pollRepository.generateUniquePollLinkID();
      const data: CreatePollData = {
        ...postPollData,
        pollLinkID,
      };
      await pollRepository.createPoll(data);
      return res.json({ pollLink: pollLinkID });
    } catch (error) {
      console.error(error);
      let errorResponse;
      if (error instanceof yup.ValidationError) {
        errorResponse = { validationErrors: error.errors };
      } else if (error instanceof Error) {
        errorResponse = { error: error.message };
      } else {
        errorResponse = { error: "An unknown error occurred" };
      }
      return res.json({ success: false, ...errorResponse });
    }
  },
};

export default pollService;

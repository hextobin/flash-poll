import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { postPollSchema } from "../validations/pollValidationSchemas";
import { PostPoll, CreatePollData } from "../types/pollTypes";
import pollRepository from "../db/pollRepository";

const pollService = {
  getPoll: async (): Promise<{ content: string; votes: number }[]> => {
    // still needs to be implemented, it will always return between [2,4] results.
    return Promise.resolve([{ content: "Hello World", votes: 5 }]);
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

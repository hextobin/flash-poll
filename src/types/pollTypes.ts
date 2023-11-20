import type { InferType } from "yup";
import { postPollSchema } from "../validations/pollValidationSchemas";
import { Prisma, Poll, Option } from "@prisma/client";

export interface PostPoll extends InferType<typeof postPollSchema> {}
export interface CreatePollData extends PostPoll {
  pollLinkID: string;
}

export type Answer = {
  id: string;
  text: string;
};

export type CompletePoll = Poll & {
  options: Option[];
};

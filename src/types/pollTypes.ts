import type { InferType } from "yup";
import { postPollSchema } from "../validations/pollValidationSchemas";

export interface PostPoll extends InferType<typeof postPollSchema> {}
export interface CreatePollData extends PostPoll {
  pollLinkID: string;
}

export type Answer = {
  id: string;
  text: string;
};

import type { CreatePollData } from "../types/pollTypes";
import { v4 as uuidv4 } from "uuid";
import prisma from "./db";

const pollRepository = {
  createPoll: async (data: CreatePollData) => {
    await prisma.poll.create({
      data: {
        duration: data.duration,
        pollLinkID: data.pollLinkID,
        question: data.question,
        options: {
          create: data.answers
            .filter((answer): answer is string => answer !== undefined)
            .map((answer) => ({ answer })),
        },
      },
    });
  },
  readPoll: async (linkID: string) => {
    const poll = await prisma.poll.findUnique({
      where: { pollLinkID: linkID },
      include: { options: true },
    });
    if (!poll) throw new Error("Poll not found");
    if (poll.duration) {
      const pollExpiration = new Date(poll.createdAt.getTime() + poll.duration);
      if (pollExpiration < new Date()) {
        // TODO: should this be handled as an error--it's not really an error
        // perhaps there's a cleaner way to handle this
        throw new Error("Poll Expired");
      }
    }
    return poll;
  },
  updatePoll: async (linkID: string, voteTarget: string) => {
    const poll = await prisma.poll.findUnique({
      where: { pollLinkID: linkID },
      include: { options: true },
    });
    if (!poll) throw new Error("Poll not found");
    const option = poll.options.find((option) => option.answer === voteTarget);
    if (!option) throw new Error("Option not found");
    await prisma.poll.update({
      where: { pollLinkID: linkID },
      data: {
        options: {
          update: {
            where: { id: option.id },
            data: { votes: { increment: 1 } },
          },
        },
      },
    });
  },
  generateUniquePollLinkID: async () => {
    let pollLinkID;
    let numTries = 0;
    do {
      numTries++;
      pollLinkID = uuidv4();
      const existingPoll = await prisma.poll.findUnique({
        where: { pollLinkID },
      });
      if (!existingPoll) return pollLinkID;
    } while (numTries < 10);
    throw new Error("Unable to generate poll link");
  },
};

export default pollRepository;

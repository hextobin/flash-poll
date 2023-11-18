import { PrismaClient } from "@prisma/client";
import type { CreatePollData } from "../types/pollTypes";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

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

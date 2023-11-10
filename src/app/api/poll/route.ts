import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postPollSchema = yup.object({
  question: yup
    .string()
    .required("Question is required")
    .min(1, "Each question must contain at least 1 character")
    .max(250, "Each question must be no more than 250 characters long"),
  answers: yup
    .array()
    .of(
      yup
        .string()
        .min(1, "Each answer must contain at least 1 character")
        .max(50, "Each answer must be no more than 50 characters long")
    )
    .min(2, "There must be at least 2 answers")
    .required("Answers are required"),
  duration: yup
    .number()
    .integer("Duration must be an integer")
    .min(1, "The minimum duration for a poll is 1 minute")
    .max(60, "The maximum duration for a poll is 60 minutes")
    .required("A duration must be specified"),
});

interface PostPoll extends yup.InferType<typeof postPollSchema> {}
interface CreatePollData extends PostPoll {
  pollLinkID: string;
}

async function generateUniquePollLinkID() {
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
}

export async function POST(req: Request) {
  try {
    const postPollData: PostPoll = await req.json().catch(() => {
      throw new Error("Unable to process data sent");
    });
    await postPollSchema.validate(postPollData);
    const pollLinkID = await generateUniquePollLinkID();
    const data: CreatePollData = {
      ...postPollData,
      pollLinkID,
    };
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
    return Response.json({ pollLink: pollLinkID });
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
    return Response.json({ success: false, ...errorResponse });
  }
}

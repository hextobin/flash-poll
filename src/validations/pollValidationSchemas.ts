import * as yup from "yup";

export const postPollSchema = yup.object({
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
    .min(60000, "The minimum duration for a poll is 1 minute")
    .max(3600000, "The maximum duration for a poll is 60 minutes")
    .required("A duration must be specified"),
});

export interface PollCreationRequestBody {
  question: string;
  answers: string[];
  duration: number | null;
}

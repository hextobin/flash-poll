import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Answer = {
  id: string;
  text: string;
};

export const usePollCreationForm = () => {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [duration, setDuration] = useState<number | null>(1);
  const [questionCharCount, setQuestionCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 250) {
      setQuestionCharCount(inputText.length);
      setQuestion(inputText);
    }
  };

  useEffect(() => {
    setAnswers([
      { id: uuidv4(), text: "" },
      { id: uuidv4(), text: "" },
    ]);
  }, []);

  const handleAnswerChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length <= 50) {
      setAnswers(
        answers.map((answer) =>
          answer.id === id ? { ...answer, text: e.target.value } : answer
        )
      );
    }
  };

  const addAnswer = () => {
    setAnswers([...answers, { id: uuidv4(), text: "" }]);
  };

  const removeAnswer = (id: string) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newDuration = parseInt(inputValue, 10);

    if (inputValue === "") {
      setDuration(null);
    } else if (!isNaN(newDuration) && newDuration >= 1 && newDuration <= 60) {
      setDuration(newDuration);
    }
  };

  return {
    question,
    answers,
    duration,
    error,
    questionCharCount,
    handleQuestionChange,
    handleAnswerChange,
    addAnswer,
    removeAnswer,
    handleDurationChange,
    setError,
    setQuestion,
    setAnswers,
    setDuration,
  };
};

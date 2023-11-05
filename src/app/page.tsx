"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PollCreationRequestBody } from "./types/poll";
import { v4 as uuidv4 } from "uuid";
import { PollQuestion } from "./_Components/PollQuestion";
import { AnswerInput } from "./_Components/AnswerInput";
import { DurationInput } from "./_Components/DurationInput";

type Answer = {
  id: string;
  text: string;
};

const PollCreationForm = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([
    { id: uuidv4(), text: "" },
    { id: uuidv4(), text: "" },
  ]);
  const [duration, setDuration] = useState<number | null>(1);
  const [error, setError] = useState<string | null>(null);
  const [questionCharCount, setQuestionCharCount] = useState(0);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= 250) {
      setQuestionCharCount(inputText.length);
      setQuestion(inputText);
    }
  };

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
    if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 60) {
      setDuration(parseInt(e.target.value, 10));
    } else if (e.target.value === "") {
      setDuration(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const poll: PollCreationRequestBody = {
      question,
      answers: answers.map((answer) => answer.text),
      duration: duration,
    };

    fetch("/api/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(poll),
    })
      .then((res) => res.json())
      .then((data) => {
        // router.push(`/poll`);
        throw new Error("Not implemented");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const showError = (error: string) => {
    return (
      <div className="alert alert-warning">
        <div className="flex-1">
          <p>{error}</p>
        </div>
        <button className="btn" onClick={() => setError(null)}>
          Dismiss
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-4 shadow-lg rounded-lg bg-white">
        {error && showError(error)}
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label className="label" htmlFor="question">
            <span className="label-text">Question:</span>
          </label>
          <PollQuestion
            question={question}
            charCount={questionCharCount}
            handleQuestionChange={handleQuestionChange}
          />
          {answers.map((answer, index) => (
            <AnswerInput
              key={answer.id}
              answer={answer}
              index={index}
              handleAnswerChange={(id, e) => handleAnswerChange(id, e)}
              removeAnswer={index >= 2 ? removeAnswer : undefined}
            />
          ))}
          <button
            type="button"
            onClick={addAnswer}
            className="btn btn-primary mt-2"
          >
            Add Answer
          </button>
          <DurationInput
            duration={duration}
            handleDurationChange={handleDurationChange}
          />

          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setQuestion("");
                setAnswers([
                  { id: uuidv4(), text: "" },
                  { id: uuidv4(), text: "" },
                ]);
                setDuration(1);
              }}
              className="btn btn-ghost"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollCreationForm;

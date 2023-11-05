"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Answer = {
  id: number;
  text: string;
};

const PollCreationForm = () => {
  const router = useRouter();
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([
    { id: Date.now(), text: "" },
    { id: Date.now() + 1, text: "" },
  ]);
  const [timeLimit, setTimeLimit] = useState<string>("");

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnswers(
      answers.map((answer) =>
        answer.id === id ? { ...answer, text: e.target.value } : answer
      )
    );
  };

  const addAnswer = () => {
    setAnswers([...answers, { id: Date.now(), text: "" }]);
  };

  const removeAnswer = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeLimit(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // post result to /api/pollCreation/

    const poll = {
      question,
      answers: answers.map((answer) => answer.text),
      timeLimit,
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
        router.push(`/poll`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-4 shadow-lg rounded-lg bg-white">
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label className="label" htmlFor="question">
            <span className="label-text">Question:</span>
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            className="input input-bordered w-full max-w-xs"
            required
          />

          {answers.map((answer, index) => (
            <div
              key={answer.id}
              className="flex flex-wrap items-center gap-2 mt-2"
            >
              <input
                type="text"
                id={`answer-${answer.id}`}
                value={answer.text}
                onChange={(e) => handleAnswerChange(answer.id, e)}
                placeholder={`Answer ${index + 1}`}
                className="input input-bordered flex-1"
                required={index < 2}
              />
              {index >= 2 && (
                <button
                  type="button"
                  onClick={() => removeAnswer(answer.id)}
                  className="btn btn-error btn-outline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAnswer}
            className="btn btn-primary mt-2"
          >
            Add Answer
          </button>

          <div className="mt-4">
            <label className="label" htmlFor="timeLimit">
              <span className="label-text">Time Limit (minutes):</span>
            </label>
            <input
              type="number"
              id="timeLimit"
              value={timeLimit}
              onChange={handleTimeLimitChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>

          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setQuestion("");
                setAnswers([
                  { id: Date.now(), text: "" },
                  { id: Date.now() + 1, text: "" },
                ]);
                setTimeLimit("");
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

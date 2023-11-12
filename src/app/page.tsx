"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PollQuestion } from "./_Components/PollQuestion";
import { AnswerInput } from "./_Components/AnswerInput";
import { DurationInput } from "./_Components/DurationInput";
import { usePollCreationForm } from "./_Components/usePollCreationForm";

const PollCreationForm = () => {
  // const router = useRouter();
  const {
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
  } = usePollCreationForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const poll = {
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
      .then(() => {
        // router.push(`/poll`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const showError = (error: string) => {
    return (
      <div className="alert alert-warning mt-4 flex items-center justify-center">
        <div className="flex-1">
          <p>{error}</p>
        </div>
        <button className="btn btn-outline" onClick={() => setError(null)}>
          Dismiss
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className=" p-5 mt-20 ml-5 mr-5 w-full md:w-2/3 lg:w-1/3  shadow-xl  bg-white ">
        <form onSubmit={handleSubmit} className="form-control">
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
              removeAnswer={index >= 2 ? removeAnswer : () => {}}
            />
          ))}
          <button
            type="button"
            onClick={addAnswer}
            className="btn w-full text-white  btn-info mt-2 "
          >
            Add Answer
          </button>
          <DurationInput
            duration={duration}
            handleDurationChange={handleDurationChange}
          />

          <div className="flex space-x-2 mt-4">
            <button type="submit" className="btn btn-accent text-white ">
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
              className="btn btn-error btn-outline "
            >
              Clear
            </button>
          </div>
        </form>
        {error && showError(error)}
      </div>
    </div>
  );
};

export default PollCreationForm;

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PollQuestion } from "../components/pollCreation/PollQuestion";
import { AnswerInput } from "../components/pollCreation/AnswerInput";
import { DurationInput } from "../components/pollCreation/DurationInput";
import { usePollCreationForm } from "../hooks/usePollCreationForm";
import ErrorDisplay from "../components/ErrorDisplay";
import pollService from "@/services/pollService";

const PollCreationForm = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const poll = {
      question,
      answers: answers.map((answer) => answer.text),
      duration: duration,
    };

    await pollService.postPoll(poll, setError);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="flex justify-center">
      <div className=" p-5 mt-20 mb-20 ml-5 mr-5 w-full md:w-2/3 lg:w-1/3  shadow-xl  bg-white ">
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
        {error && <ErrorDisplay error={error!} clearError={clearError} />}
      </div>
    </div>
  );
};

export default PollCreationForm;

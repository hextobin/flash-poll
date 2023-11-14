"use client";

const PollPage = ({ params }: { params?: { slug: string } }) => {
  // {params?.slug}
  const incomingResults = [{ content: "AAA", votes: 4 }];

  return (
    <div className="flex justify-center">
      <div className="p-5 mt-20 mb-20 ml-5 mr-5 w-full shadow-xl bg-white ">
        <span className="countdown flex justify-between font-mono text-9xl">
          {incomingResults.map((obj) => {
            return (
              <span
                className="border"
                data-testid="poll-choice"
                style={{ "--value": obj.votes }}
                key={obj.content}
              ></span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default PollPage;

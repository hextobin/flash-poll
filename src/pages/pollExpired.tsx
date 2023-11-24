const PollExpired = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Poll Expired
        </h2>
        <p className="mt-4 text-gray-600 text-center">
          Sorry, the poll you are trying to access has expired. Please check for
          other active polls or create a new one.
        </p>
      </div>
    </div>
  );
};

export default PollExpired;

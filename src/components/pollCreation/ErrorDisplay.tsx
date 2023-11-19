const ErrorDisplay = ({
  error,
  clearError,
}: {
  error: string;
  clearError: () => void;
}) => {
  return (
    <div className="alert alert-warning mt-4 flex items-center justify-center">
      <div className="flex-1">
        <p>{error}</p>
      </div>
      <button className="btn btn-outline" onClick={clearError}>
        Dismiss
      </button>
    </div>
  );
};

export default ErrorDisplay;

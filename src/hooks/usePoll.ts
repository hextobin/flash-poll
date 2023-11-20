import { useState } from "react";

export const usePoll = () => {
  const [error, setError] = useState<string | null>(null);
  const clearError = () => setError(null);
  return { error, setError, clearError };
};

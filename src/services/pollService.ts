const pollService = {
  fetchPollData: async (): Promise<{ content: string; votes: number }[]> => {
    // still needs to be implemented, it will always return between [2,4] results.
    return Promise.resolve([{ content: "Hello World", votes: 5 }]);
  },
};

export default pollService;

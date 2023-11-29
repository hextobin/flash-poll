type DurationInputProps = {
  duration: number | null;
  handleDurationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DurationInput = ({
  duration,
  handleDurationChange,
}: DurationInputProps) => (
  <div className="mt-4">
    <label className="label" htmlFor="duration">
      <span className="label-text">Poll Duration (1-60 minutes):</span>
    </label>
    <input
      type="number"
      id="duration"
      value={duration || ""}
      onChange={handleDurationChange}
      className="input input-bordered w-full"
      placeholder="Minutes"
      required
    />
  </div>
);

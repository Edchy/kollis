import Button from "../Button/Button";

export function NumberInput({ grams, setGrams, title }) {
  return (
    <div className="number-input">
      <label htmlFor={title}>{title}:</label>
      <Button
        className="number-control-btn"
        onClick={() => setGrams((prev) => prev - 10)}
      >
        ➖
      </Button>
      {/* Controlled element */}
      <input
        id={title}
        // min="0"
        // max="4000"
        // step="10"
        value={grams}
        // Value castas om till nummer
        onChange={(e) => setGrams(Number(e.target.value))}
      />
      <Button
        className="number-control-btn"
        onClick={() => setGrams((prev) => prev + 10)}
      >
        ➕
      </Button>
    </div>
  );
}

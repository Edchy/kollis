import Button from "../Button/Button";

// Denna komponent returnerar en input med en knapp på vardera sida.
// Knapp-komponenterna ändrar state med +/- 10. Detta state är det som input har som value,

export default function NumberInput({ grams, setGrams, title }) {
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
        value={grams}
        // Value castas om till nummer då jag inte använder type="number" här.
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

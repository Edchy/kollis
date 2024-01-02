import "./errormessage.css";

// Enkel komponent som kan användas där felmeddelanden ska renderars
// Som children tas meddelandet. tar även en emoji och storlek på denna som props

export default function ErrorMessage({
  children,
  emoji = "😩",
  emojiSize = 2,
}) {
  return (
    <div className="error-message">
      <span style={{ fontSize: `${emojiSize}rem` }}>{emoji}</span>
      <p>{children}</p>
    </div>
  );
}

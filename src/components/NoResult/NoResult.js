import "./noresult.css";
export default function NoResult({ children, emoji, emojiSize }) {
  return (
    <div className="no-result">
      <span style={{ fontSize: `${emojiSize}rem` }}>{emoji}</span>
      <p>{children}</p>
    </div>
  );
}

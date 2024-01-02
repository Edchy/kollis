import "./toggle.css";

// html+css för denna komponent är en modifierad version av kod tagen från https://www.w3schools.com/howto/howto_css_switch.asp

// "Togglar" mellan true/false genom att anropa statesättningsfunktionen för frukost-variabeln som skickats ner som prop och sätta det till motsatt värde varje gång (!)

export default function Toggle({ isBreakfastToggled, setIsBreakfastToggled }) {
  return (
    <>
      <label className="switch">
        <span className="switch-title">Breakfast:</span>
        <input
          onChange={() => setIsBreakfastToggled(!isBreakfastToggled)}
          checked={isBreakfastToggled}
          type="checkbox"
        />
        <span className="slider"></span>
      </label>
    </>
  );
}

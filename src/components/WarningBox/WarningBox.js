import { useEffect, useState } from "react";
import "./warningbox.css";
import Button from "../Button/Button";

// komponent som renderar en varning om användaren knappar in ett lågt eller högt värde.
export default function WarningBox({ bloodSugar }) {
  // om värde finns, och om värdet är över 12 eller under 4.2 är isActive = True.
  const [isActive, setIsActive] = useState(
    Boolean(bloodSugar && (bloodSugar > 12 || bloodSugar < 4.2))
  );

  // uppdatera isActive om värdet bloodSugar ändras
  useEffect(() => {
    setIsActive(bloodSugar && (bloodSugar > 12 || bloodSugar < 4.2));
  }, [bloodSugar]);

  // om isActive = True ges klassen "active" vilket triggar en css-animation som gör att "boxen" visas i UI.
  // beroende på vilket värde bloodSugar är renderas olika varningstexter
  return (
    <div className={`warning ${isActive ? "active" : ""}`}>
      {bloodSugar >= 20 && (
        <p>
          <span>🚨 Your bloodsugar is VERY HIGH 🚨</span> Double-check your
          values and correct them if necessary. If your bloodsugar is not
          getting lower within a couple of hours, seek medical guidance and
          check for <a href="#">Ketones</a>
        </p>
      )}
      {bloodSugar > 12 && bloodSugar < 20 && (
        <p>
          <span>🚨 Your bloodsugar is HIGH 🚨</span> Double-check your values
          and correct them if necessary. Take extra insulin.
        </p>
      )}
      {bloodSugar < 4.2 && (
        <p>
          <span>🚨 Your bloodsugar is LOW 🚨</span> Double-check your values and
          eat and/or drink something sweet. DO NOT take insulin right now!
        </p>
      )}
      <Button onClick={() => setIsActive(false)}>I Understand</Button>
    </div>
  );
}

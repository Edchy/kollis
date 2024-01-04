import { useRef, useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import "./settingspanel.css";

// komponent som renderar en "settings-ikon" som vid klick renderar en panel med inställningar
export default function SettingsPanel({ setIdealBs, idealBs }) {
  const [isOpen, setIsOpen] = useState(false);
  // referenser till panel-divven och ikonen. "Länkas" på som "ref-attribut" på respektive element i JSX.
  const settingsPanelRef = useRef(null);
  const settingsIconRef = useRef(null);

  // Hook vars syfte är att lägga till en lyssnare, om panelen är öppen, som lyssnar efter klick. Så att man kan stänga panelen genom att klicka var som helst utanför. annars, ta bort lyssnaren. returnera funktion som också tar bort lyssnaren när komponenten unmountas.
  useEffect(() => {
    function cb(e) {
      // kolla om klicket är utanför både panelen och ikonen genom att kolla om refsen innehåller klickeventets target. ikonen behöver ingå för att kunna klicka upp panelen i början.
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(e.target) &&
        settingsIconRef.current &&
        !settingsIconRef.current.contains(e.target)
      ) {
        // både ovanstående är true? då har klicket skett utanför dessa element och panelen stängs
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("click", cb);
    } else {
      document.removeEventListener("click", cb);
    }
    return () => document.removeEventListener("click", cb);
  }, [isOpen]);

  // Låt användare trycka bort  med esc. Lyssnar "globalt" efter tangentryck.
  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") {
        // om "Esc", ändra state.
        setIsOpen(false);
      }
    }
    // denna if-sats ser till att lägga till/ta bort eventylyssnaren baserat på isOpens state.
    // lägg till eventlyssnare om...
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // annars ta bort den
    } else {
      document.removeEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape); // cleanup funktion
  }, [isOpen]); // dependency

  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  function handleSelect(e) {
    setIdealBs(Number(e.target.value));
  }
  return (
    <div className="settings-outer">
      {" "}
      {/* ref + dynamisk class baserat på state (för att kunna stila ikonen baserat på om den är öppnad) */}
      <span ref={settingsIconRef} className={`icon ${isOpen ? "open" : ""}`}>
        <IoSettingsOutline onClick={toggleOpen} />
      </span>
      {/* conditional rendering - renderar när isOpen===true */}
      {isOpen && (
        <div className="settings-inner" ref={settingsPanelRef}>
          <h3>settings</h3>
          <label>
            Theme
            <ThemeChanger />
          </label>
          <label>
            Ideal BS
            <select
              value={idealBs}
              onChange={handleSelect}
              className="selectoooor"
            >
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

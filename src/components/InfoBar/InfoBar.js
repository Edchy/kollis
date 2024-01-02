import Toggle from "../Toggle/Toggle";
import "./infobar.css";
import InfoCircle from "../InfoCircle/InfoCircle";
import WarningBox from "../WarningBox/WarningBox";

export default function InfoBar({
  setBloodSugar,
  setDailyInsulin,
  dailyInsulin,
  bloodSugar,
  setIsBreakfastToggled,
  isBreakfastToggled,
}) {
  // variabeln BSColors värde baseras på bloodSugars värde (högt=rött, bra=grönt etc). variabeln sätts som värde för inputs color property.
  let BSColor;
  switch (true) {
    case bloodSugar >= 4.2 && bloodSugar < 9:
      BSColor = "#2cb67d";
      break;
    case bloodSugar >= 9 && bloodSugar < 12:
      BSColor = "yellow";
      break;
    case bloodSugar >= 12 && bloodSugar < 14:
      BSColor = "orange";
      break;
    default:
      BSColor = "var(--color-warning)";
  }

  return (
    <aside>
      {/* WarningBox visas bara om höga eller låga BS-värden har matats in. Logiken för detta finns i komponenten */}
      <WarningBox bloodSugar={bloodSugar} />
      {/* InfoCircle tar en komponent som prop och visar upp en liten symbol efter denna. Vid hover visas children. */}
      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="left"
        component={
          <label>
            BS:{" "}
            <input
              style={{
                color: BSColor,
                // om input = tomt, färg vit, annars färg baserat på bloodsugar
                caretColor: bloodSugar ? BSColor : "var(--color-light)",
              }}
              // standard kontrollerat element där varje ändring ändrar state och value är satt till samma state.
              onChange={(e) => setBloodSugar(e.target.value)}
              value={bloodSugar}
            />
          </label>
        }
      >
        <p>
          By entering your current bloodsugar (BS) here. Carboo will let you
          know how much extra insuling is needed to get you down to your ideal
          BS (which is 6 by default).
          <br />
          <br />
          This is calculated by dividing your daily insulin by 100 according to
          the rule-of-100. The resulting number is how many mmol/l 1 Unit of
          insulin will lower your BS.
        </p>
      </InfoCircle>
      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="left"
        component={
          <label>
            Daily Insulin:{" "}
            <input
              value={dailyInsulin}
              onChange={(e) => setDailyInsulin(e.target.value)}
            />
          </label>
        }
      >
        <p>ss</p>
      </InfoCircle>

      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="right"
        component={
          <Toggle
            isBreakfastToggled={isBreakfastToggled}
            setIsBreakfastToggled={setIsBreakfastToggled}
          />
        }
      >
        <p>ss</p>
      </InfoCircle>
    </aside>
  );
}

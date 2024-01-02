import Button from "../Button/Button";
import "./usertotalbox.css";
export default function UserTotalBox({
  bloodSugar,
  userList,
  dailyInsulin,
  setUserList,
  isBreakfastToggled,
  isScrolling,
}) {
  // räkna ut totalt antal kolhydrater genom att plussa ihop alla värden för varje objekts property för antal kolhydrater (carbohydrates_total_g)
  const totalCarbs = userList.reduce(
    (acc, curr) => acc + curr.carbohydrates_total_g,
    0
  );
  // logik för uträkning av insulindosering. Baseras på de olika variablerna.

  // Insulin som krävs för att sänka höga värden.
  const idealBs = 6; // målvärde
  const corrFactor = 100 / dailyInsulin; // korrigerinsfaktor räknas ut.
  // korrigeringsdos - om blodsocker är högre än det ideala värdet ska uträkning göras för hur mycket insulin som behövs, annars ska inget ges.
  const corrDose =
    bloodSugar > idealBs ? (bloodSugar - idealBs) / corrFactor : 0;

  // Insulin som krävs till kolhydrater
  // 300 eller 500 regeln, hur många gram kolhydrater tar 1 enhet insulin hand om.
  // Beräkna kolhydratsfaktor - om isBreakFastToggled === true betyder det att målet som ska ätas är frukost och därför ska 300-regeln användas, annars använd 500-regeln.
  const carbFactor = isBreakfastToggled
    ? 300 / dailyInsulin
    : 500 / dailyInsulin;

  // den totala insulindosering
  const insulinDose = totalCarbs / carbFactor + corrDose;

  return (
    <div className="total-box">
      {/* om listan innehåller minst 2 saker visas knapp för att ta bort allt */}
      {userList.length > 1 && (
        // knappens opacitet regleras baserat på isScrolling-variabeln
        <div style={{ opacity: isScrolling ? 0 : 1 }}>
          <Button
            onClick={() => setUserList([])} // nollställ listan
            className="btn reset-list-btn"
          >
            clear all
          </Button>
        </div>
      )}
      <p>total</p>
      <h2>{totalCarbs.toFixed(1)}g</h2>
      {/*visas endast om användaren matat in värde i daily insulin */}
      {dailyInsulin && <h3>{insulinDose.toFixed(1)}U</h3>}
    </div>
  );
}

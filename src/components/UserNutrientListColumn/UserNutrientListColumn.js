import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./usernutrientlistcolumn.css";

// visar upp listan för valda objekt
export function UserNutrientListColumn({
  userList,
  setUserList,
  onHandleDelete,
  dailyInsulin,
  bloodSugar,
  isBreakfastToggled,
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  // räkna ut totalt antal kolhydrater genom att plussa ihop alla värden för varje objekts property för antal kolhydrater
  const totalCarbs = userList.reduce(
    (acc, curr) => acc + curr.carbohydrates_total_g,
    0
  );
  // ENHETER för att sänka
  const idealBs = 6;
  const corrFactor = 100 / dailyInsulin;
  const corrDose =
    bloodSugar > idealBs ? (bloodSugar - idealBs) / corrFactor : 0;

  // 300 eller 500 regeln, hur många gram kolhydrater tar 1 enhet insulin hand om
  const carbFactor = isBreakfastToggled
    ? 300 / dailyInsulin
    : 500 / dailyInsulin;

  const insulinDose = totalCarbs / carbFactor + corrDose;

  // Koden i denna useEffect är ett samarbete mellan mig och chatGPT.
  // När komponenten mountas körs denna. Jag skapar en referens till
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 100);
    };
    const ref = document.querySelector(".user-list-column");
    ref.addEventListener("scroll", handleScroll);
    return () => {
      ref.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="user-list-column">
      <ul className="user-list">
        {/* "mappar ut" varje objekts olika properties till HTML-element */}
        {userList.length > 0 ? (
          userList.map((item) => (
            <li className="user-list-item" key={item.name}>
              <div>
                <h4>
                  {item.name} <span>{item.serving_size_g}g</span>
                </h4>
                <p className="item-carbs">
                  {item.carbohydrates_total_g.toFixed(1)}
                </p>
              </div>
              {/* varje objekt får en knapp, där funktionen för delete skickas in som prop. Funktionen tar objektet som parameter och filtrerar bort detta i handleDelete funktionen */}

              <Button
                className="delete-btn"
                onClick={() => onHandleDelete(item)}
              >
                ❌
              </Button>
            </li>
          ))
        ) : (
          <p className="empty-text">empty</p>
        )}
      </ul>
      <div className="total-carbs-box">
        {userList.length > 1 && (
          <div style={{ opacity: isScrolling ? 0 : 1 }}>
            <Button
              onClick={() => setUserList([])}
              className="btn reset-list-btn"
            >
              clear all
            </Button>
          </div>
        )}
        <p>total</p>
        <h2>{totalCarbs.toFixed(1)}g</h2>
        {dailyInsulin && <h3>{insulinDose.toFixed(1)}U</h3>}
      </div>
    </section>
  );
}

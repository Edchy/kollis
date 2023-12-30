import { useEffect, useState, useRef } from "react";
import Button from "../Button/Button";
import "./usernutrientlistcolumn.css";
import { UserListItem } from "../UserListItem/UserListItem";

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

  ////////////////////
  //TEST
  // LONG COMMENT ALERT!
  // Jag ville på något sätt öka UX genom att låta användaren få feedback på när man lägger till objet i listan eller när ett objekt som redan finns i listan uppdateras. En visuell markering som visar vad det är som händer när "lägga till knappen" klickas. Visste inte riktigt hur jag skulle göra detta och jag provade olika lösningar utan större framgång. Tillslut efter massa googlande, stack overflowande och dividerande med chatGPT hittade jag en lösning som fungerade. Jag kan inte säga att jag helt och hållet förstår lösningen, då den till större del, som sagt, är resultatet av copy/paste och att den introducerade, för mig, nya koncept som useRef-hooken och Set().
  // Min tanke var att varje gång den här komponenten renderas (vilket den gör varje gång ett objekt uppdateras eller läggs till i userList) så ska den tidigare userList jämföras med den nya. Om något har ändrats så ska det elementet få ett klassnamn och en animation via klassnamnet.
  const [changedItems, setChangedItems] = useState(new Set());
  const prevUserList = usePrevious(userList);
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (prevUserList) {
      const newChangedItems = new Set();

      userList.forEach((item) => {
        const prevItem = prevUserList.find((prev) => prev.name === item.name);

        // Compare based on a specific property or a simple condition
        if (!prevItem || prevItem.serving_size_g !== item.serving_size_g) {
          newChangedItems.add(item.name);
        }
      });

      // Check if there's any change to update
      if (newChangedItems.size > 0) {
        setChangedItems(newChangedItems);
      }
    }

    // Clear the set after some time
    const timer = setTimeout(() => setChangedItems(new Set()), 300);

    return () => clearTimeout(timer);
  }, [userList, prevUserList]);
  //TEST
  ////////////////////////

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
    const el = document.querySelector(".user-list-column");
    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="user-list-column">
      <ul className="user-list">
        {/* "mappar ut" varje objekts olika properties till HTML-element */}
        {userList.length > 0 ? (
          userList.map((item) => (
            <UserListItem
              onHandleDelete={onHandleDelete}
              item={item}
              key={item.name}
              className={changedItems.has(item.name) ? "highlight" : ""}
            />
          ))
        ) : (
          <p className="empty-text">🍏</p>
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

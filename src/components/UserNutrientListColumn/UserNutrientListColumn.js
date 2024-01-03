import { useEffect, useState } from "react";
import UserList from "../UserList/UserList";
import UserTotalBox from "../UserTotalBox/UserTotalBox";
import "./usernutrientlistcolumn.css";

// visar upp listan för valda objekt samt den slutgiltiga uträkningen av kolhydrater + insulin
export default function UserNutrientListColumn({
  userList,
  setUserList,
  onDelete,
  dailyInsulin,
  bloodSugar,
  isBreakfastToggled,
}) {
  const [isScrolling, setIsScrolling] = useState(false);

  // Koden i denna useEffect är ett samarbete mellan mig och chatGPT.
  // När komponenten mountas körs denna. Jag skapar en referens till
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 100);
    };
    const userListColumn = document.querySelector(".user-list-column");
    userListColumn.addEventListener("scroll", handleScroll);
    return () => {
      userListColumn.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="user-list-column">
      <UserList userList={userList} onDelete={onDelete} />
      <UserTotalBox
        bloodSugar={bloodSugar}
        userList={userList}
        dailyInsulin={dailyInsulin}
        setUserList={setUserList}
        isBreakfastToggled={isBreakfastToggled}
        isScrolling={isScrolling}
      />
    </section>
  );
}

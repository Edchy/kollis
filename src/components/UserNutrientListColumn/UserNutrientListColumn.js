import { useEffect, useRef, useState } from "react";
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
  idealBs,
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null);
  // Koden i denna useEffect är ett samarbete mellan mig och chatGPT.
  // När komponenten mountas körs denna. Jag skapar en referens till
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 100);
    };
    // const userListColumn = document.querySelector(".user-list-column");
    const userListCol = sectionRef.current;
    userListCol.addEventListener("scroll", handleScroll);
    return () => {
      userListCol.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="user-list-column">
      <UserList userList={userList} onDelete={onDelete} />
      <UserTotalBox
        bloodSugar={bloodSugar}
        userList={userList}
        dailyInsulin={dailyInsulin}
        setUserList={setUserList}
        isBreakfastToggled={isBreakfastToggled}
        isScrolling={isScrolling}
        idealBs={idealBs}
      />
    </section>
  );
}

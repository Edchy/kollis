import { useState } from "react";
import { UserNutrientListColumn } from "../UserNutrientListColumn/UserNutrientListColumn";
import "./main.css";
import swoosh from "../../swoosh.mp3";
import { SearchAndResultsColumn } from "../SearchAndResultsColumn/SearchAndResultsColumn";
// import SlideUp from "./SlideUp/SlideUp";

export default function Main({ bloodSugar, dailyInsulin, isBreakfastToggled }) {
  // state för de livsmedel som användaren lägger till i sin "lista". initialt en tom array.
  const [userList, setUserList] = useState([]);

  // tar objekt som ska tas bort som argument. anropar state-sättar funktionen för listan.
  // filtrerar listan och returnerar endast de objekt vars name inte är samma som det som skickades med som argument
  function handleDelete(item) {
    setUserList((prev) => prev.filter((obj) => obj.name !== item.name));
  }
  // lägga till en ny nutrient(maträtt/dryck)
  function handleAdd(newNutrient) {
    // letar igenom arrayen för att se om objekte redan finns. Värdet som sparas i variabeln är indexet där dubbletten finns. Annars -1 om det inte finns.
    let existIndex = userList.findIndex(
      (existingObj) => existingObj.name === newNutrient.name
    );

    // om objektet inte redan finns -> setUserList tar den "gamla" listan och "spreadar" in den tillsammans med den nya objektet
    if (existIndex === -1) {
      setUserList((prev) => [...prev, newNutrient]);
      new Audio(swoosh).play();
    }
    // Annars > uppdatera objektets properties för totala kolhydrater samt serving-size.
    // detta genom att återigen sätta state för arrayen, genom att mappa igenom den och där indexet är samma som variabeln existIndex returnera samma properties (...obj(endast name i detta fall)), men uppdatera totala kolhydrater samt serving-size genom att plussa på de nya med de gamla. om index !== existIndex returneras bara objektet.
    else {
      setUserList((prev) =>
        prev.map((obj, index) =>
          index === existIndex
            ? {
                ...obj,
                carbohydrates_total_g:
                  obj.carbohydrates_total_g + newNutrient.carbohydrates_total_g,
                serving_size_g: obj.serving_size_g + newNutrient.serving_size_g,
              }
            : obj
        )
      );
    }
  }
  return (
    <main className="main">
      {" "}
      <SearchAndResultsColumn
        onHandleAdd={handleAdd}
        setUserList={setUserList}
      />
      <UserNutrientListColumn
        onHandleDelete={handleDelete}
        userList={userList}
        setUserList={setUserList}
        bloodSugar={bloodSugar}
        dailyInsulin={dailyInsulin}
        isBreakfastToggled={isBreakfastToggled}
      />
    </main>
  );
}

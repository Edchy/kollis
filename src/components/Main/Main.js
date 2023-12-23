import { useEffect, useState } from "react";
import Button from "../Button/Button";
import NoResult from "../NoResult/NoResult";
import InfoCircle from "../InfoCircle/InfoCircle";
import "./main.css";
// import SlideUp from "./SlideUp/SlideUp";

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
export default function Main() {
  // state för de livsmedel som användaren lägger till i sin "lista". initialt en tom array.
  const [userList, setUserList] = useState([]);
  const [sectionVisible, setSectionVisible] = useState(true);

  // tar objekt som ska tas bort som argument. anropar state-sättar funktionen för listan.
  // filtrerar listan och returnerar endast de objekt vars name inte är samma som det som skickades med som argument
  function handleDelete(item) {
    console.log(item.name);
    setUserList((prev) => prev.filter((obj) => obj.name !== item.name));
  }
  // lägger till en ny nutrient(maträtt/dryck)
  function handleAdd(newNutrient) {
    // letar igenom arrayen för att se om objekte redan finns. Värdet som sparas i variabeln är indexet där dubbletten finns. Annars -1 om det inte finns.
    let existIndex = userList.findIndex(
      (existingObj) => existingObj.name === newNutrient.name
    );

    // om objektet inte redan finns -> setUserList tar den "gamla" listan och "spreadar" in den tillsammans med den nya objektet
    if (existIndex === -1) setUserList((prev) => [...prev, newNutrient]);
    // Annars > uppdatera objektets properties för totala kolhydrater samt serving-size.
    // detta genom att återigen sätta state för arrayen, genom att mappa igenom den och där indexet är samma som variabeln existIndex returnera samma properties (...obj(endast name i detta fall)), men uppdatera totala kolhydrater samt serving-size genom att plussa på de nya med de gamla. om index !== existIndex returneras bara objektet.
    else
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
  return (
    <main className="main">
      {" "}
      <SearchAndResultsColumn
        onHandleAdd={handleAdd}
        setUserList={setUserList}
      />
      {sectionVisible && (
        <UserNutrientListColumn
          onHandleDelete={handleDelete}
          userList={userList}
        />
      )}
    </main>
  );
}

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function SearchAndResultsColumn({ onHandleAdd, setUserList }) {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Hämtadata funktionen deklareras
  async function getData(q) {
    // Visar att datan laddar
    setIsLoading(true);
    // setError("");
    const url = "https://api.calorieninjas.com/v1/nutrition?query=" + q;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "OnOOnBzJskNHQToKj+jVlg==7c0VISHeXUUmy9Sz",
        },
      });
      // Kasta ny error om response INTE är OK.
      if (!response.ok)
        throw new Error(`There was an error fetching your search`);

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      setError(error.message);
      // När allt är klart finns ett resultat och "loading state" sätts till false
    } finally {
      setIsLoading(false);
    }
  }
  // func för funktionen att "quick adda" saker till listan
  function handleQuickAdd() {
    // om något skrivits in, anropa hämtadatafunktion med det som skrivits in som param, sätter arrayen "userList"s state till datan.
    if (query) {
      getData(query).then((data) => {
        // tar inte med det gamla statet = ny lista skapas
        // onSetChosen((prev) => [...prev, ...data.items]) skulle göra detta;
        setUserList(data.items);
      });
    }
    // "resetta" input state
    setQuery("");
  }

  // Funktion för när searchform submittas (Enter eller search(submit) knapp trycks)
  // I princip samma som föregående funktion (kanske skulle kunna vara DRY och slå ihop dessa på något sätt).
  function handleSubmit(e) {
    e.preventDefault();

    if (query) {
      getData(query).then((data) => {
        setSearchResults(data.items);
      });
    }

    setQuery("");
  }
  return (
    <section className="search-results-box">
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Controlled Element */}
        {/* Value sätts till query-variabeln som är state. När input ändras anropas setQuery med eventets targets värde (input) och rerendrar och det nya värdet reflekteras i input-rutan eftersom dess value är bundet till state-variabeln "query"*/}
        <input
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search food & drink...lb, g, kg, oz,"
        />
        <div className="form-buttons">
          <Button className="search-btn primary-btn" type="submit">
            Search
          </Button>

          {/* InfoCircle tar emot en komponent(med props) som prop. Tyckte detta var rätt coolt att det gick att göra. Blir inte helt lättläsligt. Men jag ville att man ska kunna skriva in en textsträng som children-prop då detta ska vara en återanvändbar komponent där man lätt kan fylla på med vad man vill ha i den som children.*/}
          <InfoCircle
            component={
              <Button
                className="quickadd-btn secondary-btn"
                onClick={handleQuickAdd}
                type="button"
              >
                Quick Add
              </Button>
            }
          >
            {" "}
            <p>
              Using{" "}
              <span style={{ textDecoration: "underline" }}>Quick Add</span>{" "}
              lets you quickly add multiple foods and drinks at once. <br />
              Simply enter the amount followed by a space and the name of the
              item that you want to add. <br />
              <br />
              <em>search example: 200g pasta 1 apple and a turkey sandwich</em>
            </p>
            <br />
            <p>
              <strong>Note!</strong> not explicitly specifying the weight of the
              item that you want can lead to less accurate results. Always
              double check the results from a reliable resource like for example{" "}
              <em>the USDA.</em>
            </p>
          </InfoCircle>
        </div>
      </form>
      {/* Conditional rendering */}
      {/* Endast om isLoading och error är false ritas SearchResultsListan ut */}
      {isLoading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <SearchResultsList
          onHandleAdd={onHandleAdd}
          searchResults={searchResults}
        />
      )}
    </section>
  );
}

function SearchResultsList({ searchResults, onHandleAdd }) {
  // Använder state, useEffect samt conditional rendering för att rendera komponenten NoResult endast EFTER den initiala renderingen. Anledningen är att texten om att sökresultat inte gav något svar annars visas direkt. Känns som att det skulle kunna lösas snyggare/effektivare (eftersom jag sätter state i min useEffect så krävs en extra render (useEffect är async och körs efter den nya DOMen ritats ut), vilket ju påverkar prestanda om det används för mycket). Men med detta fick jag en chans att prova på useEffect.
  const [x, setX] = useState("");
  useEffect(
    () => setX("Sorry! We've been searching the pantry, but couldn't find it"),
    [searchResults]
  );
  // BEHÖVER FIXAS

  return (
    <ul className="search-results">
      {/* Om arrayen innehåller något skrivs det annars skrivs meddelande att sök inte gav träff */}
      {/* varje sökresultat (objekt) mappas till en instans av Item-komponenten och skickar med objektet som prop */}
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Nutrient
            onHandleAdd={onHandleAdd}
            key={result.name}
            searchResult={result}
          />
        ))
      ) : (
        <NoResult>{x}</NoResult>
      )}
    </ul>
  );
}
function NumberInput({ grams, setGrams, title }) {
  return (
    <div className="number-input">
      <label htmlFor={title}>{title}:</label>
      <Button
        className="number-control-btn"
        onClick={() => setGrams((prev) => prev - 10)}
      >
        ➖
      </Button>
      {/* Controlled element */}
      <input
        id={title}
        min="0"
        max="4000"
        step="10"
        value={grams}
        // Value castas om till nummer
        onChange={(e) => setGrams(Number(e.target.value))}
      />
      <Button
        className="number-control-btn"
        onClick={() => setGrams((prev) => prev + 10)}
      >
        ➕
      </Button>
    </div>
  );
}
function Nutrient({ searchResult, onHandleAdd }) {
  // definierar state för att kunna via input låta användaren välja antal gram att lägga till.
  // sätts initialt till objektets värde för serving-size (default 100g)
  const [grams, setGrams] = useState(searchResult.serving_size_g);
  // genom att använda state uppdateras den här variabeln dynamiskt när state för grams ändras.
  let carbs =
    searchResult.carbohydrates_total_g * (grams / searchResult.serving_size_g);
  return (
    <li className="nutrient">
      <div className="nutrient-info">
        <h3 className="nutrient-title">{searchResult.name}</h3>

        <NumberInput title="Grams" grams={grams} setGrams={setGrams} />
        {/* <input
          id="grams"
          type="number"
          min="0"
          max="4000"
          step="10"
          value={grams}
          onChange={(e) => setGrams(Number(e.target.value))}
        /> */}
        <p>
          Carbs: <span className="nutrient-total">{carbs.toFixed(1)}g</span>
        </p>
      </div>
      {/* Här har det "prop-drillats" ordentligt. handleAdd har skickats ner genom många komponenter. Endast för att användas här (kan lösas bättre kanske?) i komponentens onClick prop. Funktionen tar ett nytt objekt som parameter och kopierar in alla properties från objektet som skickades in som prop till Item-komponenten. Men totala kolhydrater och serving-size propertiesen skrivs över med de nya användar-uppdaterade värdena */}
      <Button
        className="add-btn"
        onClick={() =>
          onHandleAdd({
            ...searchResult,
            serving_size_g: grams,
            carbohydrates_total_g: carbs,
          })
        }
      >
        ➕
      </Button>
    </li>
  );
}
// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //

// visar upp listan för valda objekt
function UserNutrientListColumn({ userList, onHandleDelete }) {
  // räkna ut totalt antal kolhydrater genom att plussa ihop alla värden för varje objekts property för antal kolhydrater
  const totalCarbs = userList.reduce(
    (acc, curr) => acc + curr.carbohydrates_total_g,
    0
  );

  return (
    <section className="user-list-column">
      <ul className="user-list">
        {/* "mappar ut" varje objekts olika properties till HTML-element */}
        {userList.map((item) => (
          <li className="user-list-item" key={item.name}>
            <div>
              <h3>
                {item.name} <span>{item.serving_size_g}g</span>
              </h3>
              <p className="item-carbs">
                {item.carbohydrates_total_g.toFixed(1)}
              </p>
            </div>
            {/* varje objekt får en knapp, där funktionen för delete skickas in som prop. Funktionen tar objektet som parameter och filtrerar bort detta i handleDelete funktionen */}
            <Button className="delete-btn" onClick={() => onHandleDelete(item)}>
              ❌
            </Button>
          </li>
        ))}
      </ul>
      <div className="total-carbs-box">
        <p>total</p>
        <h2>{totalCarbs.toFixed(1)}g</h2>
      </div>
    </section>
  );
}

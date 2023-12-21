import { useEffect, useState } from "react";
import Button from "./minicomponents/Button";
import NoResult from "./minicomponents/NoResult";

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
export default function Main() {
  // state för de livsmedel som användaren lägger till i sin "lista". initialt en tom array.
  const [chosen, setChosen] = useState([]);

  // tar objekt som ska tas bort som argument. anropar state-sättar funktionen för listan.
  // filtrerar listan och returnerar endast de objekt vars name inte är samma som det som skickades med som argument
  function handleDelete(item) {
    console.log(item.name);
    setChosen((prev) => prev.filter((obj) => obj.name !== item.name));
  }
  // lägger till en ny nutrient(maträtt/dryck)
  function handleAdd(newNutrient) {
    // letar igenom arrayen för att se om objekte redan finns. Värdet som sparas i variabeln är indexet där dubbletten finns. Annars -1 om det inte finns.
    let existIndex = chosen.findIndex(
      (existingObj) => existingObj.name === newNutrient.name
    );

    // om objektet inte redan finns -> setChosen tar den "gamla" listan och "spreadar" in den tillsammans med den nya objektet
    if (existIndex === -1) setChosen((prev) => [...prev, newNutrient]);
    // Annars > uppdatera objektets properties för totala kolhydrater samt serving-size.
    // detta genom att återigen sätta state för arrayen, genom att mappa igenom den och där indexet är samma som variabeln existIndex returnera samma properties (...obj(endast name i detta fall)), men uppdatera totala kolhydrater samt serving-size genom att plussa på de nya med de gamla. om index !== existIndex returneras bara objektet.
    else
      setChosen((prev) =>
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
      <SearchResultsBox onHandleAdd={handleAdd} setChosen={setChosen} />
      <ChosenResultBox onHandleDelete={handleDelete} chosen={chosen} />
    </main>
  );
}

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function SearchResultsBox({ onHandleAdd, setChosen }) {
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
    // om något skrivits in, anropa hämtadatafunktion med det som skrivits in som param, sätter arrayen "chosen"s state till datan.
    if (query) {
      getData(query).then((data) => {
        // tar inte med det gamla statet = ny lista skapas
        // onSetChosen((prev) => [...prev, ...data.items]) skulle göra detta;
        setChosen(data.items);
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
          placeholder="Search food & drink..."
        />
        <div className="form-buttons">
          <Button className="" type="submit">
            Search
          </Button>

          {/* InfoCircle tar emot en komponent(med props) som prop. Tyckte detta var rätt coolt att det gick att göra. Blir inte helt lättläsligt. Men jag ville att man ska kunna skriva in en textsträng som children-prop då detta ska vara en återanvändbar komponent där man lätt kan fylla på med vad man vill ha i den som children.*/}
          <InfoCircle
            component={
              <Button className="" onClick={handleQuickAdd} type="button">
                Quick Add
              </Button>
            }
          >
            {" "}
            <p>
              Using Quick Add lets you quickly add multiple foods and drinks at
              once. <br />
              Simply enter name and amount of what you want to add.
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
  useEffect(() => setX("yo"), [searchResults]);
  // BEHÖVER FIXAS

  return (
    <div className="search-results">
      {/* Om arrayen innehåller något skrivs det annars skrivs meddelande att sök inte gav träff */}
      {/* varje sökresultat (objekt) mappas till en instans av Item-komponenten och skickar med objektet som prop */}
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Item
            onHandleAdd={onHandleAdd}
            key={result.name}
            searchResult={result}
          />
        ))
      ) : (
        <NoResult>{x}</NoResult>
      )}
    </div>
  );
}

function Item({ searchResult, onHandleAdd }) {
  // definierar state för att kunna via input låta användaren välja antal gram att lägga till.
  // sätts initialt till objektets värde för serving-size (default 100g)
  const [grams, setGrams] = useState(searchResult.serving_size_g);
  // genom att använda state uppdateras den här variabeln dynamiskt när state för grams ändras.
  let carbs =
    searchResult.carbohydrates_total_g * (grams / searchResult.serving_size_g);
  return (
    <article>
      <h3>{searchResult.name}</h3>
      <div>
        Grams: {/* Controlled element */}
        <input
          type="number"
          min="0"
          max="400"
          step="10"
          value={grams}
          // Value castas om till nummer
          onChange={(e) => setGrams(Number(e.target.value))}
        />
      </div>
      <div>Carbs: {carbs.toFixed(1)}</div>

      {/* Här har det "prop-drillats" ordentligt. handleAdd har skickats ner genom många komponenter. Endast för att användas här (kan lösas bättre kanske?) i komponentens onClick prop. Funktionen tar ett nytt objekt som parameter och kopierar in alla properties från objektet som skickades in som prop till Item-komponenten. Men totala kolhydrater och serving-size propertiesen skrivs över med de nya användar-uppdaterade värdena */}
      <Button
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
    </article>
  );
}
// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //

// visar upp listan för valda objekt
function ChosenResultBox({ chosen, onHandleDelete }) {
  // räkna ut totalt antal kolhydrater genom att plussa ihop alla värden för varje objekts property för antal kolhydrater
  const totalCarbs = chosen.reduce(
    (acc, curr) => acc + curr.carbohydrates_total_g,
    0
  );

  return (
    <section>
      {/* "mappar ut" varje objekts olika properties till HTML-element */}
      {chosen.map((item) => (
        <div key={item.name}>
          <div>
            {item.name}
            {item.serving_size_g}g
          </div>
          <div>{item.carbohydrates_total_g}</div>
          {/* varje objekt får en knapp, där funktionen för delete skickas in som prop. Funktionen tar objektet som parameter och filtrerar bort detta i handleDelete funktionen */}
          <Button onClick={() => onHandleDelete(item)}>❌</Button>
        </div>
      ))}
      <h2>{totalCarbs.toFixed(1)}</h2>
    </section>
  );
}

// komponent som visar upp en info-text. tar {children} och en annan komponent som prop (för vilken info-texten ska gälla)
function InfoCircle({ children, component }) {
  return (
    <div className="info">
      {component}
      <div className="info-circle">
        💡
        <div className="infotext-box">
          <h2 style={{ textAlign: "center", fontSize: "1rem" }}>💡</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Button from "./minicomponents/Button";
import NoResult from "./minicomponents/NoResult";

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
export default function Main() {
  const [chosen, setChosen] = useState([]);

  function handleDelete(item) {
    console.log(item.name);
    setChosen((prev) => prev.filter((obj) => obj.name !== item.name));
  }

  function handleAdd(newNutrient) {
    let existIndex = chosen.findIndex(
      (existingObj) => existingObj.name === newNutrient.name
    );
    console.log(existIndex);
    console.log(newNutrient);
    if (existIndex === -1) setChosen((prev) => [...prev, newNutrient]);
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
  // func för
  function handleQuickAdd() {
    // onSetChosen((prev) => [...prev, ...data.items]);
    if (query) {
      getData(query).then((data) => {
        setChosen(data.items);
      });
    }
    setQuery("");
  }

  // Funktion för när searchform submittas (Enter eller search(submit) knapp trycks)
  function handleSubmit(e) {
    e.preventDefault();
    // om något skrivits in, anropa hämtadatafunktion med det som skrivits in som param, sätter searchresult state till datan.
    if (query) {
      getData(query).then((data) => {
        setSearchResults(data.items);
      });
    }
    // "resetta" input state
    setQuery("");
  }
  return (
    <section className="search-results-box">
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Controlled Element */}
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
          <div className="info">
            <Button className="" onClick={handleQuickAdd} type="button">
              Quick Add
            </Button>
            <div className="info-circle">
              💡
              <div class="info-box">
                Information about what happens when you click the button.
              </div>
            </div>
          </div>
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
// function Form({ onHandleSubmit, query, onSetQuery }) {
//   return (
//     <form className="search-form" onSubmit={onHandleSubmit}>
//       {/* Controlled Element */}
//       <input
//         className="search"
//         value={query}
//         onChange={(e) => onSetQuery(e.target.value)}
//         type="text"
//         placeholder="Enter foods 🥞 and/or drinks 🥤..."
//       />
//       <div className="form-buttons">
//         <Button type="submit">Search</Button>
//         <Button onClick={() => console.log(query)} type="button">
//           Quick Add
//         </Button>
//       </div>
//     </form>
//   );
// }

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
  const [grams, setGrams] = useState(searchResult.serving_size_g);
  let carbs =
    searchResult.carbohydrates_total_g * (grams / searchResult.serving_size_g);
  return (
    <article>
      <h3>{searchResult.name}</h3>
      <div>
        Grams:{" "}
        <input
          type="number"
          min="0"
          max="400"
          step="10"
          value={grams}
          onChange={(e) => setGrams(Number(e.target.value))}
        />
      </div>
      <div>Carbs: {carbs.toFixed(1)}</div>
      {/* <button
        onClick={() => {
          onHandleAdd({
            ...searchResult,
            serving_size_g: grams,
            carbohydrates_total_g: carbs,
          });
        }}
      >
        add
      </button> */}
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

function ChosenResultBox({ chosen, onHandleDelete }) {
  const totalCarbs = chosen.reduce(
    (acc, curr) => acc + curr.carbohydrates_total_g,
    0
  );

  return (
    <section>
      {chosen.map((item) => (
        <div key={item.name}>
          <div>
            {item.name}
            {item.serving_size_g}g
          </div>
          <div>{item.carbohydrates_total_g}</div>
          <Button onClick={() => onHandleDelete(item)}>❌</Button>
        </div>
      ))}
      <h2>{totalCarbs.toFixed(1)}</h2>
    </section>
  );
}

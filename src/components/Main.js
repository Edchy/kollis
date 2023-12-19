import { useState } from "react";

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
export default function Main() {
  const [chosen, setChosen] = useState([]);
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
      <SearchBox onHandleAdd={handleAdd} />
      <ResultBox chosen={chosen} />
    </main>
  );
}

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function SearchBox({ onHandleAdd }) {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Hämta data funktionen deklareras
  async function fetchData(q) {
    // Visar att datan laddar
    setIsLoading(true);
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
      // sätter "searchResults" state till fetch resultatet

      setSearchResults(data.items);
    } catch (error) {
      setError(error.message);
      // När allt är klart finns ett resultat och "loading state" sätts till false
    } finally {
      setIsLoading(false);
    }
  }
  // Funktionen körs när form submittas
  function handleSubmit(e) {
    e.preventDefault();
    // funktionen anropar datahämtningsfunktionen med det som skrivs i input, om något skrivits in.
    if (query) fetchData(query);
    // "resetta" input state
    setQuery("");
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        {/* Controlled Element */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Enter food or drink..."
        />
        <button type="submit">Search</button>
        <button type="button">Quick Add</button>
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
  return (
    <div>
      {/* Om arrayen innehåller något skrivs det annars skrivs meddelande */}
      {searchResults.length > 0
        ? searchResults.map((result) => (
            <Item
              onHandleAdd={onHandleAdd}
              key={result.name}
              searchResult={result}
            />
          ))
        : "no result"}
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
      <button
        onClick={() => {
          onHandleAdd({
            ...searchResult,
            serving_size_g: grams,
            carbohydrates_total_g: carbs,
          });
        }}
      >
        add
      </button>
    </article>
  );
}
// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function ResultBox({ chosen }) {
  const totalCarbs = chosen.reduce(
    (acc, curr) => acc + curr.carbohydrates_total_g,
    0
  );
  return (
    <div>
      {chosen.map((item, i) => (
        <div key={item.name + i}>
          <div>
            {item.name}
            {item.serving_size_g}g
          </div>
          <div>{item.carbohydrates_total_g}</div>
        </div>
      ))}
      <h2>{totalCarbs.toFixed(1)}</h2>
    </div>
  );
}

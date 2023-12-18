import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InfoBar from "./components/InfoBar";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Header />
      <InfoBar />
      <Main>
        <SearchBox />
        <ResultBox />
      </Main>
      <Footer />
    </div>
  );
}
// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function SearchBox() {
  const [nutrients, setNutrients] = useState([]);
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
      // sätter "nutrients" state till fetch resultatet
      setNutrients(data.items);
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
        />
      </form>
      {/* Conditional rendering */}
      {/* Endast om isLoading och error är false ritas nutrients-arrayen ut */}
      {isLoading && <p>loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && <NutrientsList nutrients={nutrients} />}
    </section>
  );
}

function NutrientsList({ nutrients }) {
  return (
    <div>
      {/* Om arrayen innehåller något skrivs det annars skrivs meddelande */}
      {nutrients.length > 0
        ? nutrients.map((n) => <Nutrient key={n.name} nutrient={n} />)
        : "no result"}
    </div>
  );
}

function Nutrient({ nutrient }) {
  return (
    <article>
      <h3>{nutrient.name}</h3>
      <div>Portion: {nutrient.serving_size_g}g</div>
      <div>Carbs: {nutrient.carbohydrates_total_g}</div>
      <button>add</button>
    </article>
  );
}
// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function ResultBox() {
  return <div style={{ border: "1px solid black" }}></div>;
}

import { useState } from "react";
import Button from "../Button/Button";
import InfoCircle from "../InfoCircle/InfoCircle";
import Loader from "../Loader/Loader";
import { SearchResultsList } from "../SearchResultsList/SearchResultsList";
import "./searchandresultscolumn.css";

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
export function SearchAndResultsColumn({ onHandleAdd, setUserList }) {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  // searched skickas ner som prop till till searchResultsList. Agerar boolean för om komponenten NoResult ska renderars eller ej (conditional rendering). Sätts till true när funktionen handleSubmit körs. Hela syftet här är att endast rendera NoResult komponenten efter att man gjort en sökning och inte initialt när sidan har laddats. En lösning som visserligen fungerar men som skulle kunna göras på ett enklare sätt.
  const [searched, setSearched] = useState(false);

  // Hämtadata funktionen deklareras
  async function getData(q) {
    // Visar att datan laddar
    setIsLoading(true);
    setError("");
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
    setSearched(true);
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
            offset={-24}
            boxdirecion="right"
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
              Using <em>Quick Add</em> lets you quickly add multiple foods and
              drinks at once. <br />
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
              the <a href="https://www.usda.gov/">USDA.</a>
            </p>
          </InfoCircle>
        </div>
      </form>
      {/* Conditional rendering */}
      {/* Endast om isLoading och error är false ritas SearchResultsListan ut */}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <SearchResultsList
          onHandleAdd={onHandleAdd}
          searchResults={searchResults}
          searched={searched}
        />
      )}
    </section>
  );
}

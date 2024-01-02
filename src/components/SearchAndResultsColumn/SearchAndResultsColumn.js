import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResultsList from "../SearchResultsList/SearchResultsList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./searchandresultscolumn.css";

export default function SearchAndResultsColumn({ onHandleAdd, setUserList }) {
  const [searchResults, setSearchResults] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  // searched skickas ner som prop till till searchResultsList. Agerar boolean för om komponenten NoResult ska renderars eller ej (conditional rendering). Sätts till true när funktionen handleSubmit körs. Hela syftet här är att endast rendera NoResult komponenten efter att man gjort en sökning och inte initialt när sidan har laddats. En lösning som visserligen fungerar men som kanske skulle kunna göras på ett enklare sätt.
  const [searched, setSearched] = useState(false);

  // Hämtadata funktionen deklareras
  async function getData(q) {
    // Visar en "loader" när datan laddas in
    setIsLoading(true);
    // "nollställ" error meddelande
    setFetchError("");
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
      return data;
    } catch (fetchError) {
      setFetchError(fetchError.message);
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
        if (data) setUserList(data.items);
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
        if (data) setSearchResults(data.items);
      });
    }
    setQuery("");
    setSearched(true);
  }
  return (
    <section className="search-results-box">
      <SearchForm
        onHandleSubmit={handleSubmit}
        onHandleQuickAdd={handleQuickAdd}
        setQuery={setQuery}
        query={query}
      />
      {/* Conditional rendering */}
      {/* Endast om isLoading och error är false ritas SearchResultsListan ut */}
      {isLoading && <Loader />}
      {fetchError && <ErrorMessage>Sorry! {fetchError}</ErrorMessage>}
      {!isLoading && !fetchError && (
        <SearchResultsList
          onHandleAdd={onHandleAdd}
          searchResults={searchResults}
          searched={searched}
        />
      )}
    </section>
  );
}

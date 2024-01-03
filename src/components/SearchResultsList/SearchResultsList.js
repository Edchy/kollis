import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Nutrient from "../Nutrient/Nutrient";
import "./searchresults.css";

export default function SearchResultsList({ searchResults, onAdd, searched }) {
  return (
    <ul className="search-results">
      {/* Om arrayen innehåller något skrivs det annars skrivs meddelande att sök inte gav träff */}
      {/* !searched ser till att ternary operatorn inte är false när sidan först laddas */}
      {/* varje sökresultat (objekt) mappas till en instans av Nutrient-komponenten och skickar med objektet som prop */}
      {searchResults.length > 0 || !searched ? (
        searchResults.map((result) => (
          <Nutrient onAdd={onAdd} key={result.name} searchResult={result} />
        ))
      ) : (
        <ErrorMessage>
          Sorry! We've been searching the pantry, but couldn't find what you're
          looking for.
        </ErrorMessage>
      )}
    </ul>
  );
}

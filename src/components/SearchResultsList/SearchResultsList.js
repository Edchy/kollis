import NoResult from "../NoResult/NoResult";
import { Nutrient } from "../Nutrient/Nutrient";
import "./searchresults.css";

export function SearchResultsList({ searchResults, onHandleAdd, searched }) {
  // Använder state, useEffect samt conditional rendering för att rendera komponenten NoResult endast EFTER den initiala renderingen. Anledningen är att texten om att sökresultat inte gav något svar annars visas direkt. Känns som att det skulle kunna lösas snyggare/effektivare (eftersom jag sätter state i min useEffect så krävs en extra render (useEffect är async och körs efter den nya DOMen ritats ut), vilket ju påverkar prestanda om det används för mycket). Men med detta fick jag en chans att prova på useEffect.
  // useEffect(() => setX(false), []); searched === false
  // BEHÖVER FIXAS
  return (
    <ul className="search-results">
      {/* Om arrayen innehåller något skrivs det annars skrivs meddelande att sök inte gav träff */}
      {/* varje sökresultat (objekt) mappas till en instans av Nutrient-komponenten och skickar med objektet som prop */}
      {searchResults.length > 0 || !searched ? (
        searchResults.map((result) => (
          <Nutrient
            onHandleAdd={onHandleAdd}
            key={result.name}
            searchResult={result}
          />
        ))
      ) : (
        <NoResult emoji="😟" emojiSize="3">
          Sorry! We've been searching the pantry, but couldn't find what you're
          looking for.
        </NoResult>
      )}
    </ul>
  );
}

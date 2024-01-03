import Button from "../Button/Button";
import InfoCircle from "../InfoCircle/InfoCircle";
import "./searchform.css";

export default function SearchForm({ onQuickAdd, onSubmit, query, setQuery }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
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
              onClick={onQuickAdd}
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
            Simply enter the amount followed by a space and the name of the item
            that you want to add. <br />
            <br />
            <em>search example: 200g pasta 1 apple and a turkey sandwich</em>
          </p>
          <br />
          <p>
            <strong>Note!</strong> not explicitly specifying the weight of the
            item that you want can lead to less accurate results. Always double
            check the results from a reliable resource like for example the{" "}
            <a href="https://www.usda.gov/">USDA.</a>
          </p>
        </InfoCircle>
      </div>
    </form>
  );
}

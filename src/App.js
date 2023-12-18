import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";

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
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData(q) {
      setIsLoading(true);
      const apiUrl = "https://api.calorieninjas.com/v1/nutrition?query=" + q;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "OnOOnBzJskNHQToKj+jVlg==7c0VISHeXUUmy9Sz",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setQueries(data.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      }
    }
    fetchData("toma");
  }, []);

  return (
    <section>
      <Queries queries={queries} />
    </section>
  );
}

function Queries({ queries }) {
  return (
    <div>
      {queries.map((q) => (
        <div key={q.name}>{q.name}</div>
      ))}
    </div>
  );
}

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function ResultBox() {
  return (
    <div style={{ border: "1px solid black" }}>
      <p>din mat hamnar här(conditional rendering)</p>
      <h2>My Foods:</h2>
      <article style={{ borderBottom: "1px solid black" }}>
        <p>Apple (20g / 100g) (20%)</p>
        <p>You are about to eat: X grams</p>
      </article>
      <article style={{ borderBottom: "1px solid black" }}>
        <p>Apple (20g / 100g) (20%)</p>
        <p>You are about to eat: X grams</p>
      </article>
    </div>
  );
}

// // // // // // // // // //
// // // COMPONENT // // //
// // // // // // // // //
function InfoBar() {
  return (
    <aside style={{ gridArea: "aside", backgroundColor: "lightpink" }}>
      info
    </aside>
  );
}

export default function App() {
  return (
    <div className="App">
      <MainHeader />
    </div>
  );
}

function MainHeader() {
  return (
    <header className="main-header">
      <nav role="navigation" aria-label="Main Navigation" className="main-nav">
        <div className="main-logo">Kollis</div>
        <ul className="main-list">
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
      </nav>
    </header>
  );
}

// async function fetchData(q) {
//   const apiKey = "OnOOnBzJskNHQToKj+jVlg==7c0VISHeXUUmy9Sz";
//   const apiUrl = "https://api.calorieninjas.com/v1/nutrition?query=" + q;

//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Api-Key": apiKey,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();

//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//   }
// }

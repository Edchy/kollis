import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InfoBar from "./components/InfoBar";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="App">
      <Header />
      <InfoBar />
      <Main />
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InfoBar from "./components/InfoBar/InfoBar";
import Main from "./components/Main/Main";

export default function App() {
  // detta state lever här för att kunna skickas ner till flera barn.
  const [bloodSugar, setBloodSugar] = useState("");
  // state hämtar värde från localstorage. genom att returnera värdet via en callback så sker detta endast "on mount" och inte på efterföljande re-renders.
  // om värde finns i localstorage returneras det, annars ett fallback value. || operatorn returnerar det första värdet om det är truthy(vilket det inte kommer vara initialt), annars returneras det andra.
  const [idealBs, setIdealBs] = useState(() => {
    return localStorage.getItem("idealBs") || 6;
  });
  const [dailyInsulin, setDailyInsulin] = useState(() => {
    return localStorage.getItem("dailyInsulin") || "";
  });
  const [isBreakfastToggled, setIsBreakfastToggled] = useState(false);

  // Spara det som användaren skriver in inputet för hur mycket insulin som används dagligen, samt värdet för idealBs ändras då dessa värden är något som sällan behöver ändras. Genom att spara detta i localstorage slipper användaren att mata in detta varje gång den besöker sidan. bloodsugar däremot, är ett ständigt ändrande värde så detta sparas inte i ls.

  // dessa körs varje gång state för resp variabel ändras (dependency) och uppdaterar localstorage.
  useEffect(() => {
    localStorage.setItem("dailyInsulin", dailyInsulin);
  }, [dailyInsulin]);

  useEffect(() => {
    localStorage.setItem("idealBs", idealBs);
  }, [idealBs]);

  return (
    <>
      <Header setIdealBs={setIdealBs} idealBs={idealBs} />
      <InfoBar
        setBloodSugar={setBloodSugar}
        bloodSugar={bloodSugar}
        setDailyInsulin={setDailyInsulin}
        dailyInsulin={dailyInsulin}
        isBreakfastToggled={isBreakfastToggled}
        setIsBreakfastToggled={setIsBreakfastToggled}
        idealBs={idealBs}
      />
      <Main
        isBreakfastToggled={isBreakfastToggled}
        bloodSugar={bloodSugar}
        dailyInsulin={dailyInsulin}
        idealBs={idealBs}
      />
      <Footer />
    </>
  );
}

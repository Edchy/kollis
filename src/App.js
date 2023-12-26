import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InfoBar from "./components/InfoBar/InfoBar";
import Main from "./components/Main/Main";

export default function App() {
  // detta state lever här för att kunna skickas ner till flera barn.
  const [bloodSugar, setBloodSugar] = useState("");
  const [dailyInsulin, setDailyInsulin] = useState("");
  const [isBreakfastToggled, setIsBreakfastToggled] = useState(false);

  // Spara det som användaren skriver in inputet för hur mycket insulin som används dagligen, då detta värde är något som sällan behöver ändras. Genom att spara detta i localstorage slipper användaren att mata in detta varje gång den besöker sidan. Blodsocker däremot, är ett ständigt ändrande värde så detta sparas inte i ls.

  // useEffect som körs on-mount endast (inga dependencies). Hämtar "userInput" från localstorage och sparar i variabel. Om "userInput" finns -> sätt state till variabeln.
  useEffect(() => {
    const storedDailyInsulinValue = localStorage.getItem("userInput");
    if (storedDailyInsulinValue) setDailyInsulin(storedDailyInsulinValue);
  }, []);

  // körs varje gång state för dailyInsulin ändras (dependency). Uppdaterar "userInput" i localstorage till värdet för dailyInsulin
  useEffect(() => {
    localStorage.setItem("userInput", dailyInsulin);
  }, [dailyInsulin]);

  return (
    <>
      <Header />
      <InfoBar
        setBloodSugar={setBloodSugar}
        bloodSugar={bloodSugar}
        setDailyInsulin={setDailyInsulin}
        dailyInsulin={dailyInsulin}
        isBreakfastToggled={isBreakfastToggled}
        setIsBreakfastToggled={setIsBreakfastToggled}
      />
      <Main
        isBreakfastToggled={isBreakfastToggled}
        bloodSugar={bloodSugar}
        dailyInsulin={dailyInsulin}
      />
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";
import "./themechanger.css";

// definierar mina temans olika färger för css-variabler
const themes = {
  carboo: {
    "-brand-primary": "#7f5af0",
    "-brand-secondary": "#2cb67d",
    "-brand-tertiary": "#37e3e6",
    "-dark-700": "#16161a",
    "-dark-500": "#333337",
    "-dark-300": "#666a70",
    "-light": "#fefefa",
    "-bg": "#fefefa",
    "-text": "#16161a",
  },
  moon: {
    "-brand-primary": "#f9a277",
    "-brand-secondary": "#847cc0",
    "-dark-300": "lightgray",
    "-dark-500": "#0f375f",
    "-dark-700": "black",
    "-light": "#ffe9f9",
    "-bg": "#0f375e",
    "-text": "#ffe9f9",
  },
  oj: {
    "-brand-primary": "#fc6227",
    "-brand-secondary": "#ff9b36",
    "-dark-300": "lightgray",
    "-dark-500": "#1f201f",
    "-dark-700": "#682b18",
    "-light": "#ffe9f9",
    "-bg": "#1f201f",
    "-text": "#ff9b36",
  },
};
export default function ThemeChanger() {
  // sätter state till att hämta värdet för "theme" i localstorage när komponenten mountar (så att valet av tema "stannar kvar" vid reload/återbesök)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "carboo";
  });
  // när theme ändras (dependency), spara i localstorage.
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // när theme ändras (dependency), loopa igenom themes-objektet vars namn är valt och för varje nyckel ändra css-variablerna i :root(documentElement) till de definierade värdena i objektet.
  useEffect(() => {
    const root = document.documentElement;
    Object.keys(themes[theme]).forEach((key) => {
      root.style.setProperty(`--color${key}`, themes[theme][key]);
    });
  }, [theme]);

  // ändra tema
  function changeTheme(e) {
    setTheme(e.target.value);
  }

  return (
    <select
      onChange={changeTheme}
      name="theme-changer"
      id="theme-changer"
      className="selectoooor"
      value={theme}
    >
      <option value="carboo">Carboo 👻</option>
      <option value="moon">Moonlight 🌕</option>
      <option value="oj">Dark OJ 🍊</option>
    </select>
  );
}

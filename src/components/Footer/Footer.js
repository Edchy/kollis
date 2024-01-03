import "./Footer.css";
import SlideUp from "../SlideUp/SlideUp";

export default function Footer() {
  function changeTheme(e) {
    const root = document.documentElement;
    const colors = {
      primary: "red",
    };

    root.style.setProperty("--color-brand-primary", colors.primary);
    root.style.setProperty("--color-brand-secondary", "red");
    root.style.setProperty("--color-dark-300", "red");
    root.style.setProperty("--color-dark-500", "red");
    root.style.setProperty("--color-dark-700", "red");
    root.style.setProperty("--color-light", "red");

    if (e === "carboo") {
      root.style.removeProperty("--color-brand-primary");
      root.style.removeProperty("--color-brand-secondary");
      root.style.removeProperty("--color-dark-300");
      root.style.removeProperty("--color-dark-500");
      root.style.removeProperty("--color-dark-700");
      root.style.removeProperty("--color-light");
    }
  }

  return (
    <footer className="main-footer">
      {/* <SlideUp /> */}
      <div>&copy; 2023 Carboo!</div>
      <select
        onChange={(e) => changeTheme(e.target.value)}
        name="theme-changer"
        id="theme-changer"
      >
        <option value="carboo">Carboo👻</option>
        <option value="moon">Moonlight🌕</option>
      </select>
    </footer>
  );
}

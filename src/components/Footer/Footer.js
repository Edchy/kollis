import "./Footer.css";
import SlideUp from "../SlideUp/SlideUp";
import ThemeChanger from "../ThemeChanger/ThemeChanger";

export default function Footer() {
  return (
    <footer className="main-footer">
      {/* <SlideUp /> */}
      <div>&copy; 2023 Carboo!</div>
      <ThemeChanger />
    </footer>
  );
}

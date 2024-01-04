import { useState } from "react";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import SettingsPanel from "../SettingsPanel/SettingsPanel";
import "./Header.css";

const navLinks = ["How to use", "Diabetes 101", "Ketones"];

export default function Header({ setIdealBs, idealBs }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <header className="main-header">
      <nav role="navigation" aria-label="Main Navigation" className="main-nav">
        <div className="main-logo">
          <img src="logo3.png" alt="site logo" />
          <div>
            <h1>
              Carb
              <span>oo!</span>
            </h1>
            <p>Spooktacular Carb-Counting</p>
          </div>
        </div>
        <ul className="nav-list">
          <li>{navLinks[0]}</li>
          <li>{navLinks[1]}</li>
          <li>{navLinks[2]}</li>
        </ul>
        <div className="flex-group">
          <DropDownMenu
            navLinks={navLinks}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
          />
          <SettingsPanel setIdealBs={setIdealBs} idealBs={idealBs} />
        </div>
      </nav>
    </header>
  );
}

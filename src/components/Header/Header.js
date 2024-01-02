import { useState } from "react";
import Button from "../Button/Button";
import "./Header.css";

export default function Header() {
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
          <li>How to use</li>
          <li>Diabetes 101</li>
          <li>Ketones</li>
        </ul>
        <Button className="toggle-menu-btn" onClick={toggleOpen}>
          X
        </Button>
        <div className={`drop-down-menu ${isOpen ? "open" : ""}`}>
          <ul>
            <li>How to use</li>
            <li>Diabetes 101</li>
            <li>Ketones</li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <nav role="navigation" aria-label="Main Navigation" className="main-nav">
        <div className="main-nav__logo">
          <img src="logo3.png" alt="site logo" />
          <div>
            <h1>Carboo</h1>
            <p>Spooktacular Carb Counting</p>
          </div>
        </div>
        <ul className="main-nav__list">
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
      </nav>
    </header>
  );
}

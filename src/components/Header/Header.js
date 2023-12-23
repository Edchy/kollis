import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <nav role="navigation" aria-label="Main Navigation" className="main-nav">
        <div className="main-nav__logo">
          <img width="75px" src="cc-logo.webp" alt="" />
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

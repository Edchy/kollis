import "./loader.css";

// Koden här, inkl css-filen är, en html/css loader jag hittade för typ ett år sedan (codepen tror jag). Det enda jag har gjort är att lägga till den i komponenten nedan och modifierat css-filen. Jag har tyvärr inte någon referens till upphovsman (), men som sagt, detta är copy-paste.

export default function Loader() {
  return (
    <div className="container">
      <div className="loader">
        <span></span>
      </div>
      <div className="loader">
        <span></span>
      </div>
      <div className="loader">
        <i></i>
      </div>
      <div className="loader">
        <i></i>
      </div>
    </div>
  );
}

import "./loader.css";

// Koden här är, inkl css-filen är, en html/css loader jag hittade för länge sedan. Det enda jag har gjort är att lägga till den i komponenten nedan och modifierat css-filen. Jag har tyvärr inte någon referens till upphovsman, men som sagt, detta är copy-paste (den är urläcker).

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

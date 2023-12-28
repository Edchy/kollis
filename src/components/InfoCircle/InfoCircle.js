import "./infocircle.css";

// komponent som visar upp en info-text. tar {children} och en annan komponent som prop (för vilken info-texten ska gälla). tar även fler props som modifierar style för om komponenten ska visas till höger eller vänster, samt med vilken offset. default värden används om props inte används.
export default function InfoCircle({
  children,
  component,
  direction = "right",
  offset,
  boxdirecion = "left",
}) {
  return (
    <div className="info">
      {component}
      <div
        style={{ [direction]: offset ? `${offset}px` : "0px" }}
        className="info-circle"
      >
        👻
        <div style={{ [boxdirecion]: "100%" }} className="infotext-box">
          <h4>
            What's this? <span className="emoji">👻</span>
          </h4>
          {children}
        </div>
      </div>
    </div>
  );
}

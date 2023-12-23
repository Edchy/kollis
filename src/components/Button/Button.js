import PropTypes from "prop-types";
import "./button.css";

// återanvändbar Knapp som tar children, onClick-funktion, class, och type som props

export default function Button({
  children,
  type = "button", // om ingen type anges blir den av type="button"
  onClick = () => {},
  className = "",
}) {
  return (
    // varje knapp får en default class "btn", utöver de som skickas in som props
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
// lekte lite med proptypes eftersom jag inte använder TS (än).
/*
här definieras att: 
- children måste anges
- knappen måste vara av typ; button, reset eller submit
- onClick måste vara en funktion
- class ska vara av typ "string"
*/
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

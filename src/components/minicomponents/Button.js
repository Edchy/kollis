import PropTypes from "prop-types";

export default function Button({
  children,
  type = "button",
  onClick = () => {},
  className = "",
}) {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

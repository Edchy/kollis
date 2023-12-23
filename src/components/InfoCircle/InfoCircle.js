import "./infocircle.css";

// komponent som visar upp en info-text. tar {children} och en annan komponent som prop (för vilken info-texten ska gälla)
export default function InfoCircle({ children, component }) {
  return (
    <div className="info">
      {component}
      <div className="info-circle">
        💡
        <div className="infotext-box">
          <h2 style={{ textAlign: "center", fontSize: "1rem" }}>💡</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

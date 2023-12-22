import { useEffect, useState } from "react";

export default function SlideUp() {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 2000);
    // Clean up - för att cleartimeout inte ska köras direkt, utan istället bara när komponenten unmountas (eller innan effekten körs igen om den har dependencies)
    return () => clearTimeout(timer);
  }, []);

  return <div className={`slide-up ${isShowing ? "visible" : ""}`}>bb</div>;
}

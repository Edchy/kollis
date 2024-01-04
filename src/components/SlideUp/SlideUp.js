import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./slideup.css";

export default function SlideUp() {
  const [isShowing, setIsShowing] = useState(false); // reglerar komponentens visibilitet
  const [speechBubbleText, setSpeechBubbleText] = useState(0); // reglerar vilken text som visas

  // setTimeout är en side-effect och därför används useEffect hooken.
  // Efter en viss tid ändras state till true och komponenten blir synlig
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
      setSpeechBubbleText(0);
    }, 1);
    // Clean up - för att cleartimeout inte ska köras direkt, utan istället bara när komponenten unmountas (eller innan effekten körs igen om den har dependencies)
    return () => clearTimeout(timer);
  }, []);

  // Låt användare trycka bort slideUp med esc. Lyssnar "globalt" efter tangentryck.
  useEffect(() => {
    function handleEscape(e) {
      if (e.code === "Escape") {
        // om "Esc", ändra state.
        setIsShowing(false);
      }
    }
    // denna if-sats ser till att lägga till/ta bort evenylyssnaren baserat på isShowings state.
    // lägg till eventlyssnare om...
    if (isShowing) {
      document.addEventListener("keydown", handleEscape);
      // annars ta bort den
    } else {
      document.removeEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape); // cleanup funktion (osäker om den behövs här)
  }, [isShowing]); // dependency

  // lyssna efter "click". ändra state++ vid klick.
  useEffect(() => {
    function handleClick() {
      setSpeechBubbleText((prev) => prev + 1);
      if (speechBubbleText === 3) setIsShowing(false);
    }
    if (isShowing) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
  }, [isShowing, speechBubbleText]);

  // texten i pratbubblan. plockas ut per index.
  const messages = [
    <>
      <h3>BOO! Hope i didn't scare you.</h3>
      <p>
        Welcome to Carboo. The app that aims to make carb-counting not so scary
        👻.
      </p>
    </>,
    <p>
      Just type in the delicious stuff that you are about to eat or drink in the
      search-bar above, and hit <strong>'enter'</strong>.<br /> You may search
      for multiple items all at once, like this:{" "}
      <em>apple milk bread fanta...</em>
    </p>,
    <p>
      {" "}
      You may also directly specify the weight of your foods like this: <br />{" "}
      <em>100g pasta 1lb beef 1oz onion</em>
    </p>,
    <p>
      <strong>Note</strong> that only weight measurements are supported, not
      volume measurements like l, mL, cups, fl oz, etc. For converting from
      volume to weight, click{" "}
      <a target="blank" href="https://google.com">
        here
      </a>
    </p>,
    <p>boo</p>,
  ];

  return (
    // ge class baserat på state
    <div className={`slide-up ${isShowing ? "visible" : ""}`}>
      <div className={`speech-bubble ${isShowing ? "fade-in" : "fade-out"}`}>
        {/* rendera meddelande baserat på index i array */}
        {messages[speechBubbleText]}
        {speechBubbleText <= 3 && <span>(tap to continue...)</span>}
        <Button onClick={() => setIsShowing(false)}>&times;</Button>
        <div aria-hidden className="bubble-tip"></div>
      </div>
      <img src="slideUp.png" alt="a friendly ghost" />
    </div>
  );
}

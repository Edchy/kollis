import { useState } from "react";
import Toggle from "../Toggle/Toggle";
import "./infobar.css";
import InfoCircle from "../InfoCircle/InfoCircle";
import WarningBox from "../WarningBox/WarningBox";

export default function InfoBar({
  setBloodSugar,
  setDailyInsulin,
  dailyInsulin,
  bloodSugar,
  setIsBreakfastToggled,
  isBreakfastToggled,
}) {
  let BSColor;

  switch (true) {
    case bloodSugar >= 4.2 && bloodSugar < 9:
      BSColor = "var(--color-brand-secondary)";
      break;
    case bloodSugar >= 9 && bloodSugar < 12:
      BSColor = "yellow";
      break;
    case bloodSugar >= 12 && bloodSugar < 14:
      BSColor = "orange";
      break;
    default:
      BSColor = "var(--color-warning)";
  }

  return (
    <aside>
      <WarningBox bloodSugar={bloodSugar} />
      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="left"
        component={
          <label>
            BS:{" "}
            <input
              style={{
                color: BSColor,
                caretColor: bloodSugar ? BSColor : "var(--color-light)",
              }}
              onChange={(e) => setBloodSugar(e.target.value)}
              value={bloodSugar}
            />
          </label>
        }
      >
        <p>
          By entering your current bloodsugar (BS) here. Carboo will let you
          know how much extra insuling is needed to get you down to your ideal
          BS (which is 6 by default).
          <br />
          <br />
          This is calculated by dividing your daily insulin by 100 according to
          the rule-of-100. The resulting number is how many mmol/l 1 Unit of
          insulin will lower your BS.
        </p>
      </InfoCircle>
      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="left"
        component={
          <label>
            Daily Insulin:{" "}
            <input
              value={dailyInsulin}
              onChange={(e) => setDailyInsulin(e.target.value)}
            />
          </label>
        }
      >
        <p>ss</p>
      </InfoCircle>

      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="right"
        component={
          <Toggle
            isBreakfastToggled={isBreakfastToggled}
            setIsBreakfastToggled={setIsBreakfastToggled}
          />
        }
      >
        <p>ss</p>
      </InfoCircle>

      {/* <div>Your current BS: {bloodSugar}</div>
      <div>Your daily insulin: {dailyInsulin}</div> */}
    </aside>
  );
}

import { useState } from "react";
import Toggle from "../Toggle/Toggle";
import "./infobar.css";
import InfoCircle from "../InfoCircle/InfoCircle";

export default function InfoBar({
  setBloodSugar,
  setDailyInsulin,
  dailyInsulin,
  bloodSugar,
  setIsBreakfastToggled,
  isBreakfastToggled,
}) {
  return (
    <aside>
      <InfoCircle
        direction="right"
        offset={-24}
        boxdirecion="left"
        component={
          <label>
            BS:{" "}
            <input
              onChange={(e) => setBloodSugar(e.target.value)}
              value={bloodSugar}
            />
          </label>
        }
      ></InfoCircle>
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
      ></InfoCircle>

      <InfoCircle
        direction="left"
        offset={-84}
        boxdirecion="right"
        component={
          <Toggle
            isBreakfastToggled={isBreakfastToggled}
            setIsBreakfastToggled={setIsBreakfastToggled}
          />
        }
      >
        s{" "}
      </InfoCircle>

      {/* <div>Your current BS: {bloodSugar}</div>
      <div>Your daily insulin: {dailyInsulin}</div> */}
    </aside>
  );
}

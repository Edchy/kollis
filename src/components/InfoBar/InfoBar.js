import { useState } from "react";
import Toggle from "../Toggle/Toggle";
import "./infobar.css";

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
      <label>
        BS:{" "}
        <input
          type="text"
          onChange={(e) => setBloodSugar(e.target.value)}
          value={bloodSugar}
        />
      </label>

      <label>
        Daily Insulin:{" "}
        <input
          value={dailyInsulin}
          onChange={(e) => setDailyInsulin(e.target.value)}
        />
      </label>

      <Toggle
        isBreakfastToggled={isBreakfastToggled}
        setIsBreakfastToggled={setIsBreakfastToggled}
      />
      {/* <div>Your current BS: {bloodSugar}</div>
      <div>Your daily insulin: {dailyInsulin}</div> */}
    </aside>
  );
}

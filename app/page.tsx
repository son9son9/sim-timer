"use client";

import styles from "./style.module.scss";
import SimTimer from "./components/sim-timer/SimTimer";
import HourTimer from "./components/hour-timer/HourTimer";

export default function Home() {
  return (
    <div
      // className={`
      //   ${timerStatus === "IMMINENT" ? styles["bg-warning"] : timerStatus === "CLOSED" ? styles["bg-closed"] : ""}
      className={`
       flex flex-col gap-4 items-center min-h-screen px-4 py-8 [text-shadow:_0px_0px_3px_#1e374b] bg-[#1c282c]`}
    >
      <div className="w-80 h-full block rounded border-2 border-white">
        <div className="bg-[#96bbc9] pt-1 px-1 border-b-4 border-[#c0d6e0]">
          <div className="rounded-sm text-xs p-1 text-left bg-white text-gray-600">
            <div className="bg-[#438abd] rounded border-2 border-[#345b7c] p-0.5">
              <div className="bg-[#5d9dcd] h-0.5" />
              <SimTimer />
              <div className="bg-[#5d9dcd] h-0.5 mx-1 my-2 shadow-[0px_-1px_1px_#3069a2]" />
              <HourTimer />
              <div className="bg-[#5d9dcd] h-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

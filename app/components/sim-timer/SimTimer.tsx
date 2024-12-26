import Image from "next/image";
import styles from "./SimTimer.module.scss";
import { useEffect, useState } from "react";
import { timeFormatter } from "../../logic/common/common";

const SimTimer = () => {
  // 타이머 초기값 (2분)
  const [simTime] = useState(120000);
  // 경고 시간 설정
  const [warningTime] = useState(30000);
  // 남은 시간
  const [timeLeft, setTimeLeft] = useState(simTime);
  // 타이머 상태 (비활성화: IDLE, 동작: ACTIVE, 임박: IMMINENT, 종료: CLOSED)
  const [timerStatus, setTimerStatus] = useState("IDLE");
  // 타이머 동작/비동작 상태
  const [isRunning, setIsRunning] = useState(false);
  // Worker 인스턴스
  const [worker, setWorker] = useState<Worker | null>(null);

  // 타이머 시작
  const startClickHandler = () => {
    if (worker) {
      // Worker에 인자로 type과 초기 설정 시간을 전송
      worker.postMessage({ type: "START", time: simTime });
      // 타이머 상태 동작으로 변경
      setTimerStatus("ACTIVE");
      setIsRunning(true);
    }
  };

  // 타이머 중지
  const stopClickHandler = () => {
    if (worker) {
      // Worker에 type: "RESET" 인자 전송
      worker.postMessage({ type: "RESET" });
      // 타이머 상태 비활성화로 변경
      setTimerStatus("IDLE");
      setIsRunning(false);
    }
  };

  // 타이머 시간 설정
  // const timeSettingHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.currentTarget.value);
  //   if (!e.currentTarget.value) {
  //     setSimTime(0);
  //   } else {
  //     setSimTime(parseInt(e.currentTarget.value) * 60000);
  //   }
  // };

  useEffect(() => {
    // Worker 생성
    const simTimerWorker: Worker = new Worker(new URL("../../logic/worker/worker.ts", import.meta.url));

    // Worker onmessage listener
    simTimerWorker.onmessage = (e: MessageEvent) => {
      switch (e.data.type) {
        case "TICK":
          setTimeLeft(e.data.timeLeft);
          setIsRunning(true);
          break;
        case "COMPLETE":
          setTimeLeft(0);
          setIsRunning(false);
          break;
        case "RESET":
          setTimeLeft(simTime);
          setIsRunning(false);
          break;
      }
    };
    // Worker 인스턴스 할당
    setWorker(simTimerWorker);

    return () => {
      // 언마운트 시 워커 삭제
      simTimerWorker.terminate();
    };
  }, []);

  // 남은 시간에 따른 타이머 상태 변경
  useEffect(() => {
    if (timeLeft === simTime && !isRunning) {
      setTimerStatus("IDLE");
    } else if (timeLeft > warningTime) {
      setTimerStatus("ACTIVE");
    } else if (timeLeft > 0) {
      setTimerStatus("IMMINENT");
    } else if (timeLeft === 0) {
      setTimerStatus("CLOSED");
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-items-center p-4 text-center text-[#eeeeee]">
      <div className="relative w-full flex justify-between relative">
        <div className="flex flex-col items-start gap-0">
          <div className="text-xl pb-1">홀심 타이머</div>
          <div className="flex flex-wrap place-items-center text-sm text-slate-300">
            <div className="">타이머 시간 :&nbsp;</div>
            {/* <input
            type="number"
            className="w-4 h-4 text-base color-[#345b7c] bg-transparent border-b text-center"
            defaultValue={simTime / 60000}
            onInput={(e) => {
              timeSettingHandler(e);
            }}
          /> */}
            <span className="text-base">{Math.floor(simTime / 60000)}</span>&nbsp;분
          </div>
          <div className="flex flex-wrap place-items-center text-sm text-slate-300">
            <div className="">경고 시간 :&nbsp;</div>
            <span className="text-base">{warningTime / 1000}</span>&nbsp;초
          </div>
        </div>
        {/* src에 이미지 동적할당이 불가하기에 하드코딩으로 대체 */}
        <div className="absolute top-[-6px] right-[-2px]">
          {timerStatus === "IDLE" && (
            <Image
              className="w-fit h-fit object-none"
              src="https://maplestory.io/api/GMS/62/mob/5130107/render/stand"
              alt="Coolie Zombie Stand"
              width={32}
              height={32}
              unoptimized={true}
            />
          )}
          {timerStatus === "ACTIVE" && (
            <Image
              className="w-fit h-fit object-none"
              src="https://maplestory.io/api/GMS/62/mob/5130107/render/move"
              alt="Coolie Zombie Move"
              width={32}
              height={32}
              unoptimized={true}
            />
          )}
          {timerStatus === "IMMINENT" && (
            <Image
              className="w-fit h-fit object-none relative right-[-14px]"
              src="https://maplestory.io/api/GMS/62/mob/5130107/render/attack1"
              alt="Coolie Zombie Attack"
              width={32}
              height={32}
              unoptimized={true}
            />
          )}
          {timerStatus === "CLOSED" && (
            <Image
              className="w-fit h-fit object-none relative right-[-12px]"
              src="https://maplestory.io/api/GMS/62/mob/5130107/render/die1"
              alt="Coolie Zombie Died"
              width={32}
              height={32}
              unoptimized={true}
            />
          )}
        </div>
      </div>
      <div
        className={`${
          timerStatus === "IMMINENT" ? styles["text-warning"] : timerStatus === "CLOSED" ? styles["text-closed"] : ""
        } text-8xl w-full p-4 active:scale-95 transition duration-100 z-10 [user-drag:none] cursor-pointer`}
        onClick={startClickHandler}
      >
        {timeFormatter(timeLeft)}
      </div>
      <div className="text-slate-300 text-sm relative top-[-24px] transition duration-200">
        {isRunning ? "홀심 타이머 작동 중 ..." : "타이머 클릭 시 타이머가 시작됩니다."}
      </div>
      <div className="flex text-4xl gap-12">
        <div className="active:scale-75 transition duration-100 cursor-pointer" onClick={startClickHandler}>
          ▶
        </div>
        <div className="active:scale-75 transition duration-100 cursor-pointer" onClick={stopClickHandler}>
          ■
        </div>
      </div>
    </div>
  );
};

export default SimTimer;

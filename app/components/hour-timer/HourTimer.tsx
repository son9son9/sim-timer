import styles from "./HourTimer.module.scss";
import { useEffect, useState } from "react";
import { dateFormatter, timeFormatter } from "../../logic/common/common";

interface ChildProps {
  changeTimerStatus: (mode: string) => void;
}

const HourTimer = ({ changeTimerStatus }: ChildProps) => {
  // 타이머 초기값 (60분)
  const [oneTime] = useState(60 * 60 * 1000);
  // 경고 시간 설정
  const [warningTime] = useState(2 * 60 * 1000);
  // 남은 시간
  const [timeLeft, setTimeLeft] = useState(oneTime);
  // 타이머 상태 (비활성화: IDLE, 동작: ACTIVE, 임박: IMMINENT, 종료: CLOSED)
  const [timerStatus, setTimerStatus] = useState("IDLE");
  // 타이머 동작/비동작 상태
  const [isRunning, setIsRunning] = useState(false);
  // Worker 인스턴스
  const [worker, setWorker] = useState<Worker | null>(null);
  // 타이머 시작 시간
  const [startTime, setStartTime] = useState<number | null>(null);

  // 타이머 시작
  const startClickHandler = () => {
    if (worker) {
      // Worker에 인자로 type과 초기 설정 시간을 전송
      worker.postMessage({ type: "START", time: oneTime });
      // 타이머 상태 동작으로 변경
      setTimerStatus("ACTIVE");
      setIsRunning(true);
      setStartTime(new Date().getTime());
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
      //   setStartTime(null);
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
    const hourTimerWorker: Worker = new Worker(new URL("../../logic/worker/worker.ts", import.meta.url));

    // Worker onmessage listener
    hourTimerWorker.onmessage = (e: MessageEvent) => {
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
          setTimeLeft(oneTime);
          setIsRunning(false);
          break;
      }
    };
    // Worker 인스턴스 할당
    setWorker(hourTimerWorker);

    return () => {
      // 언마운트 시 워커 삭제
      hourTimerWorker.terminate();
    };
  }, []);

  // 남은 시간에 따른 타이머 상태 변경
  useEffect(() => {
    if (timeLeft === oneTime && !isRunning) {
      setTimerStatus("IDLE");
    } else if (timeLeft > warningTime) {
      setTimerStatus("ACTIVE");
    } else if (timeLeft > 0) {
      setTimerStatus("IMMINENT");
    } else if (timeLeft === 0) {
      setTimerStatus("CLOSED");
    }
  }, [timeLeft]);

  // timer status 변경 시 props 함수 호출
  useEffect(() => {
    changeTimerStatus(timerStatus);
  }, [timerStatus]);

  return (
    <div className="flex flex-col items-center justify-items-center p-4 text-center text-[#eeeeee] gap-4">
      <div className="relative w-full h-full flex justify-between relative">
        <div className="flex flex-col items-start gap-1">
          <div className="text-xl">한탐 타이머</div>
          {startTime ? (
            <div className="text-base text-slate-300">{dateFormatter(oneTime, startTime) + " 종료"}</div>
          ) : (
            <div className="flex flex-wrap place-items-center text-base text-slate-300">
              {/* <div className="">타이머 시간 :&nbsp;</div> */}
              <span className="text-base">{Math.floor(oneTime / (60 * 1000))}</span>분
            </div>
          )}
        </div>
        {/* <div className="bg-[#5d9dcd] w-0.5 h-30 shadow-[-1px_-1px_1px_#3069a2]" /> */}
        <div className="flex flex-col items-end">
          <div
            className={`${
              (timerStatus === "IMMINENT" && styles["text-warning"]) || (timerStatus === "CLOSED" && styles["text-closed"])
            } text-5xl cursor-pointer`}
          >
            {timeFormatter(timeLeft)}
          </div>
        </div>
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

export default HourTimer;

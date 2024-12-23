// initialization
const INTERVAL = 1000;
let itvID: NodeJS.Timeout | undefined;
let timeLeft: number = 0;

// Timing Function
self.onmessage = (e: MessageEvent) => {
  switch (e.data.type) {
    case "START":
      // 타이머 시작 전에 instance 정리
      clearInterval(itvID);
      itvID = undefined;

      if (!itvID && e.data.time > 0) {
        timeLeft = e.data.time;

        // 시작값 전송
        self.postMessage({ type: "TICK", timeLeft });

        itvID = setInterval(() => {
          timeLeft = (Math.round(timeLeft / 1000) - 1) * 1000;
          self.postMessage({ type: "TICK", timeLeft });

          if (timeLeft <= 0) {
            clearInterval(itvID);
            itvID = undefined;
            self.postMessage({ type: "COMPLETE" });
          }
        }, INTERVAL);
      }
      break;
    case "RESET":
      clearInterval(itvID);
      itvID = undefined;
      timeLeft = 0;
      self.postMessage({ type: "RESET" });
      break;
    // case "RESET_AND_START":
    //   break;
  }
};

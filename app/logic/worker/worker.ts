// initialization
const INTERVAL = 1000;
let itvID: NodeJS.Timeout;
let timeLeft: number = 0;

// Timing Function
self.onmessage = (e: MessageEvent) => {
  switch (e.data.type) {
    case "START":
      if (!itvID && e.data.time > 0) {
        timeLeft = e.data.time;

        // 시작값 전송
        self.postMessage({ type: "TICK", timeLeft });

        itvID = setInterval(() => {
          console.log("TICK", timeLeft);
          timeLeft = (Math.round(timeLeft / 1000) - 1) * 1000;
          self.postMessage({ type: "TICK", timeLeft });

          if (timeLeft <= 0) {
            clearInterval(itvID);
            console.log(itvID);
            self.postMessage({ type: "COMPLETE" });
          }
        }, INTERVAL);
      }
      break;
    case "RESET":
      clearInterval(itvID);
      timeLeft = 0;
      console.log("RESET", itvID);
      self.postMessage({ type: "RESET" });
      break;
    // case "RESET_AND_START":
    //   break;
  }
};

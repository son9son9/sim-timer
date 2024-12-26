export const timeFormatter = (t: number) => {
  const time = new Date(t);
  const minuteOverAHour = Math.floor(t / (60 * 1000));
  // const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `${minuteOverAHour >= 60 ? minuteOverAHour : minuteOverAHour > 9 ? minuteOverAHour : `0${minuteOverAHour}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

export const dateFormatter = (t: number, now: number) => {
  const closeTime = new Date(t + now);
  const semidiurnal = closeTime.getHours() > 11 ? "오후" : "오전";
  const hours = closeTime.getHours();
  const minutes = closeTime.getMinutes();

  return `${semidiurnal} ${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`;
};

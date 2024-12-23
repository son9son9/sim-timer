export const timeFormatter = (t: number) => {
  const time = new Date(t);
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  return timeString;
};

// production 환경에서 이미지 prefix 적용
export const getImagePath = (path: string) => {
  return `${process.env.NODE_ENV === "production" ? "/sim-timer" : ""}${path}`;
};

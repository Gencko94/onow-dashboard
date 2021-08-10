import { randomNumber } from "./randomNumber";
const DEFAULT_COLOR = "hsl(50deg, 100%, 50%)"; // bright yellow
export const generateSparkle = (color: string = DEFAULT_COLOR) => {
  return {
    id: randomNumber(1111, 9999),
    createdAt: Date.now(),
    color,
    size: randomNumber(10, 20),
    style: {
      top: randomNumber(0, 100) + "%",
      left: randomNumber(0, 100) + "%",
    },
    zIndex: 2,
  };
};

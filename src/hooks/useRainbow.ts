import { useRef } from "react";
import { useEffect, useState } from "react";

const rainbowColors = [
  "hsl(1deg, 100%, 55%)", // red
  "hsl(25deg, 100%, 50%)", // orange
  "hsl(40deg, 100%, 50%)", // yellow
  "hsl(130deg, 100%, 40%)", // green
  "hsl(230deg, 100%, 45%)", // blue
  "hsl(240deg, 100%, 45%)", // indigo
  "hsl(260deg, 100%, 55%)", // violet
];
const paletteSize = rainbowColors.length;

const useRainbow = ({ intervalDelay = 1000 }) => {
  // Register all custom properties.
  // This only ever needs to be done once, so there are no dependencies.
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      try {
        // @ts-ignore: Unreachable code error
        CSS.registerProperty({
          name: `--magic-rainbow-color-${i}`,
          initialValue: rainbowColors[i],
          syntax: "<color>",
          inherits: false,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  // Get an ever-incrementing number from another custom hook*
  const intervalCount = useIncrementingNumber(intervalDelay);
  // Using that interval count, derive each current color value
  return {
    "--magic-rainbow-color-0": rainbowColors[(intervalCount + 1) % paletteSize],
    "--magic-rainbow-color-1": rainbowColors[(intervalCount + 2) % paletteSize],
    "--magic-rainbow-color-2": rainbowColors[(intervalCount + 3) % paletteSize],
  };
};
export default useRainbow;
function useIncrementingNumber(delay: number) {
  const [count, setCount] = useState(0);

  const savedCallback = useRef(() => setCount((c) => c + 1));

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return count;
}

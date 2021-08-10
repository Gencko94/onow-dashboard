import { CSSProperties } from "styled-components";
import useRainbow from "../../../hooks/useRainbow";

interface ButtonProps {
  intervalDelay?: number;
}

const MagicRainbowButton: React.FC<ButtonProps> = ({
  children,
  intervalDelay = 1000,
}) => {
  const colors = useRainbow({ intervalDelay });
  const colorKeys = Object.keys(colors);
  return (
    <button
      className="btn btn-md-default"
      style={
        {
          ...colors,
          transition: `
          ${colorKeys[0]} 2500ms linear,
          ${colorKeys[1]} 2500ms linear,
          ${colorKeys[2]} 2500ms linear
        `,
          color: "#fff",
          background: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
        } as CSSProperties
      }
    >
      {children}
    </button>
  );
};

export default MagicRainbowButton;

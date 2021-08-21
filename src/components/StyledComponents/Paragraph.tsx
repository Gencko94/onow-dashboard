import { CSSProperties, FC } from "react";
import styled from "styled-components";
import { up } from "../../utils/themes";

interface IProps {
  mb?: string;
  fontSize?: string;
  color?:
    | "primary"
    | "secondary"
    | "text"
    | "textContrast"
    | "textAlt"
    | "textAltContrast";

  margin?: string;
  weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
  align?: "center" | "right" | "left";
}

const Paragraph: FC<IProps> = ({
  children,
  fontSize = "1rem",
  mb,
  color = "text",
  margin,
  weight = "regular",
  align,
}) => {
  return (
    <P
      style={
        {
          "--margin-b": `${mb}`,
        } as CSSProperties
      }
      color={color}
      mb={mb}
      weight={weight}
      fontSize={fontSize}
      margin={margin}
      align={align}
    >
      {children}
    </P>
  );
};
type COLORS =
  | "primary"
  | "secondary"
  | "text"
  | "textContrast"
  | "textAlt"
  | "textAltContrast";
export default Paragraph;
const P = styled.p<{
  color: COLORS;
  margin?: string;
  mb?: string;
  weight: "light" | "regular" | "semibold" | "bold" | "xbold";
  fontSize: string;
  align?: "center" | "right" | "left";
}>(
  ({ theme, color, margin, mb, weight, fontSize, align }) => `

  color: ${theme[`${color}` as COLORS]};
  margin:${margin};
  text-align:${align};
  font-weight:${theme.font[weight]};
  margin-bottom: ${mb ? mb : ""};
 
  font-size: calc(${fontSize} - 0.1rem);
  ${up(theme.breakpoints.md)}{
      font-size:${fontSize}

  }
  `
);

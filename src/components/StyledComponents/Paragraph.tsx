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
  color,
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

export default Paragraph;
const P = styled.p<{
  color?:
    | "primary"
    | "secondary"
    | "text"
    | "textContrast"
    | "textAlt"
    | "textAltContrast";
  margin?: string;
  mb?: string;
  weight: "light" | "regular" | "semibold" | "bold" | "xbold";
  fontSize: string;
  align?: "center" | "right" | "left";
}>(
  ({
    theme: {
      breakpoints,
      text,
      textAlt,
      textAltContrast,
      textContrast,
      primary,
      secondary,
      font,
    },
    color,
    margin,
    mb,
    weight,
    fontSize,
    align,
  }) => `
  color: ${[color]};
  margin:${margin};
  text-align:${align};
  font-weight:${font[weight]};
  margin-bottom: ${mb ? mb : ""};
 
  font-size: calc(${fontSize} - 0.1rem);
  ${up(breakpoints.md)}{
      font-size:${fontSize}

  }
  `
);

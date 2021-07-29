import { CSSProperties, FC } from "react";
import styled from "styled-components";
import { up } from "../../utils/themes";

interface IProps {
  mb?: string;
  fontSize?: string;
  color?:
    | "textPrimary"
    | "textPrimaryContrast"
    | "textSecondary"
    | "textSecondaryContrast"
    | "green"
    | "themeColor";
  padding?: string;
  margin?: string;
  weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
}

const Paragraph: FC<IProps> = ({
  padding,
  children,
  fontSize = "1rem",
  mb,
  color,
  margin,
  weight = "regular",
}) => {
  return (
    <Wrapper
      style={
        {
          "--margin-b": `${mb}`,
          "--padding": padding,
        } as CSSProperties
      }
      color={color}
      mb={mb}
      weight={weight}
      fontSize={fontSize}
      margin={margin}
    >
      {children}
    </Wrapper>
  );
};

export default Paragraph;
export const Wrapper = styled.p<{
  color?:
    | "textPrimary"
    | "textPrimaryContrast"
    | "textSecondary"
    | "textSecondaryContrast"
    | "green"
    | "themeColor";
  margin?: string;
  mb?: string;
  weight: "light" | "regular" | "semibold" | "bold" | "xbold";
  fontSize: string;
}>(
  ({
    theme: {
      breakpoints,
      textPrimary,
      textPrimaryContrast,
      textSecondary,
      textSecondaryContrast,
      green,
      font,
      mainColor,
    },
    color,
    margin,
    mb,
    weight,
    fontSize,
  }) => `
  color: ${
    color === "textPrimary"
      ? textPrimary
      : color === "textPrimaryContrast"
      ? textPrimaryContrast
      : color === "textSecondary"
      ? textSecondary
      : color === "textSecondaryContrast"
      ? textSecondaryContrast
      : color === "green"
      ? green
      : color === "themeColor"
      ? mainColor
      : "inherit"
  };
  margin:${margin};
  font-weight:${font[weight]};
  margin-bottom: ${mb ? mb : ""};
  padding:var(--padding,0);
  font-size: calc(${fontSize} - 0.1rem);
  ${up(breakpoints.md)}{
      font-size:${fontSize}

  }
  `
);

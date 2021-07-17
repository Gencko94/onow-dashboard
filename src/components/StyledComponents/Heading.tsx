import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mb?: string;
  color?: "primary" | "subheading" | "heading";
  padding?: string;
  margin?: string;
  weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
  textAlign?: "center" | "right" | "left";
}

const Heading: FC<IProps> = ({
  tag,
  padding,
  children,
  mb,
  color = "heading",
  margin,
  weight = "regular",
  textAlign,
}) => {
  return (
    <Wrapper
      style={
        {
          "--margin-b": `${mb}`,
          "--color": color,
        } as CSSProperties
      }
      as={tag}
      color={color}
      mb={mb}
      weight={weight}
      margin={margin}
      textAlign={textAlign}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
export const Wrapper = styled.h1<{
  color: "primary" | "subheading" | "heading";
  mb?: string;
  weight: "light" | "regular" | "semibold" | "bold" | "xbold";
  margin?: string;
  padding?: string;
  textAlign?: "center" | "left" | "right";
}>(
  ({
    theme: { breakpoints, mainColor, subHeading, headingColor, font },
    color,
    mb,
    weight,
    margin,
    padding,
    textAlign,
  }) => `
  color: ${
    color === "heading"
      ? headingColor
      : color === "primary"
      ? mainColor
      : color === "subheading"
      ? subHeading
      : headingColor
  };
  margin:${margin};
  font-weight:${font[weight]};
  margin-bottom: ${mb ? mb : ""};
  padding:${padding};
  text-align:${textAlign};
  `
);

import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mb?: string;
  color?: "primary" | "subheading" | "heading";
  padding?: string;
  margin?: string;
  weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
}

const Heading: FC<IProps> = ({
  tag,
  padding,
  children,
  mb,
  color = "heading",
  margin,
  weight = "regular",
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
}>(
  ({
    theme: { breakpoints, mainColor, subHeading, headingColor, font },
    color,
    mb,
    weight,
    margin,
    padding,
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
  `
);

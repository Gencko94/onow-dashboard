import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mb?: string;
  color?: "primary" | "subheading" | "heading";
  padding?: string;
  margin?: string;
}

const Heading: FC<IProps> = ({
  tag,
  padding,
  children,
  mb,
  color = "heading",
  margin,
}) => {
  return (
    <Wrapper
      style={
        {
          "--margin-b": `${mb}`,
          "--color": color,
          "--padding": padding,
          "--margin": margin,
        } as CSSProperties
      }
      as={tag}
      color={color}
      mb={mb}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
export const Wrapper = styled.h1<{
  color: "primary" | "subheading" | "heading";
  mb?: string;
}>(
  ({
    theme: { breakpoints, mainColor, subHeading, headingColor },
    color,
    mb,
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
  margin:var(--margin,0);
  margin-bottom: ${mb ? mb : ""};
  padding:var(--padding,0);
  `
);

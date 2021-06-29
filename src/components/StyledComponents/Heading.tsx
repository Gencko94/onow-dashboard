import { CSSProperties, FC } from "react";
import styled from "styled-components";

interface IProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mb?: string;
  color?: "primary" | "subheading" | "heading";
}

const Heading: FC<IProps> = ({ tag, children, mb, color = "heading" }) => {
  return (
    <Wrapper
      style={{ "--margin-b": `${mb}`, "--color": color } as CSSProperties}
      as={tag}
      color={color}
    >
      {children}
    </Wrapper>
  );
};

export default Heading;
export const Wrapper = styled.h1<{
  color: "primary" | "subheading" | "heading";
}>(
  ({ theme: { breakpoints, mainColor, subHeading, headingColor }, color }) => `
  color: ${
    color === "heading"
      ? headingColor
      : color === "primary"
      ? mainColor
      : color === "subheading"
      ? subHeading
      : headingColor
  };
  margin-bottom: var(--margin-b, 0);
  font-size
  @media ${breakpoints.md}{
    font-size:initial;
  }
  `
);

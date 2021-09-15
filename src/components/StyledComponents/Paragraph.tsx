import { CSSProperties, forwardRef } from "react";
import styled from "styled-components";

interface IProps extends React.ComponentPropsWithoutRef<"p"> {
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

const Paragraph = forwardRef<HTMLParagraphElement, IProps>(
  (
    {
      fontSize = "1rem",
      mb,
      color = "text",
      margin,
      weight = "regular",
      align,
      ...delegated
    },
    ref
  ) => {
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
        {...delegated}
      >
        {delegated.children}
      </P>
    );
  }
);
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
}>`
  color: ${({ theme, color }) => theme[`${color}` as COLORS]};
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.align};
  font-weight: ${(props) => props.theme.font[props.weight]};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};

  font-size: ${(props) => `calc(${props.fontSize} - 0.1rem)`};
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    font-size: ${(props) => props.fontSize};
  }
`;

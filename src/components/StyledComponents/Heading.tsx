import { FC } from "react";
import styled from "styled-components";
type DefaultHeadingProps = Omit<JSX.IntrinsicElements["h1"], "ref">;
interface IProps extends DefaultHeadingProps {
  type?:
    | "section-title"
    | "small-title"
    | "medium-title"
    | "large-title"
    | "major-heading"
    | "normal-heading"
    | "minor-heading";
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mb?: string;
  // color?:
  //   | "primary"
  //   | "secondary"
  //   | "text"
  //   | "textContrast"
  //   | "textAlt"
  //   | "textAltContrast";
  // padding?: string;
  // margin?: string;
  // weight?: "light" | "regular" | "semibold" | "bold" | "xbold";
  // textAlign?: "center" | "right" | "left";
}

const Heading: FC<IProps> = ({
  tag,
  type = "medium-title",
  // padding,
  mb,
  color = "heading",
  // margin,
  // weight = "regular",
  // textAlign,
  ...delegated
}) => {
  let Component;
  if (type === "section-title") {
    Component = SectionTitle;
  } else if (type === "small-title") {
    Component = SmallTitle;
  } else if (type === "medium-title") {
    Component = MediumTitle;
  } else if (type === "large-title") {
    Component = LargeTitle;
  } else if (type === "major-heading") {
    Component = MajorHeading;
  } else if (type === "normal-heading") {
    Component = NormalHeading;
  } else if (type === "minor-heading") {
    Component = MinorHeading;
  } else {
    throw new Error("Unrecognized Heading type: " + type);
  }

  return <Component as={tag} {...delegated} />;
};
export default Heading;

const SectionTitle = styled.h1`
  font-size: 16px;
  color: ${(props) => props.theme.secondary};
  font-weight: ${(props) => props.theme.font.semibold};
  /* text-transform: uppercase; */
  /* letter-spacing: 0.9px; */
`;

const SmallTitle = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.secondary};
  font-weight: ${(props) => props.theme.font.semibold};
  margin-top: 16px;
  margin-bottom: 8px;
`;
const MediumTitle = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.text};
  line-height: 1.2;
`;
const LargeTitle = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.text};
`;

const MajorHeading = styled.h2`
  font-size: 32px;
  color: ${(props) => props.theme.primary};
  margin-top: 64px;
  margin-bottom: 16px;
`;
const NormalHeading = styled.h3`
  font-size: 25px;
  color: ${(props) => props.theme.primary};
  margin-top: 64px;
  margin-bottom: 12px;
`;
const MinorHeading = styled.h4`
  font-size: 20px;
  color: ${(props) => props.theme.primary};

  margin-top: 24px;
  margin-bottom: 12px;
`;

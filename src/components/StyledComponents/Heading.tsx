import { FC } from "react";
import styled from "styled-components";
import { up } from "../../constants";
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
}

const Heading: FC<IProps> = ({
  tag,
  type = "medium-title",
  // padding,
  mb,
  color = "heading",

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
`;

const SmallTitle = styled.h1(
  ({ theme: { breakpoints, font } }) => `
  font-size: 18px;
  
  font-weight: ${font.semibold};
  
  ${up(breakpoints.md)}{
    font-size: 20px;
  }
  `
);
const MediumTitle = styled.h1(
  ({ theme: { breakpoints, font, text } }) => `
  font-size: 20px;
  color: ${text};
  line-height: 1.2;
  margin-top: 8px;
  margin-bottom: 8px;

  ${up(breakpoints.md)}{
    font-size: 28px;
  }
  `
);
const LargeTitle = styled.h1(
  ({ theme: { breakpoints, font, text } }) => `
  font-size: 28px;
  color: ${text};
  

  ${up(breakpoints.md)}{
    font-size: 38px;
  }
  `
);
const MajorHeading = styled.h1(
  ({ theme: { breakpoints, primary } }) => `
  font-size: 25px;
  color: ${primary};
  margin-top: 16px;
  margin-bottom: 16px;

  ${up(breakpoints.md)}{
    font-size: 32px;
  }
  `
);
const NormalHeading = styled.h1(
  ({ theme: { breakpoints, primary } }) => `
  font-size: 20px;
  color: ${primary};
  margin-top: 16px;
  margin-bottom: 16px;

  ${up(breakpoints.md)}{
    font-size: 25px;
  }
  `
);
const MinorHeading = styled.h1(
  ({ theme: { breakpoints, primary } }) => `
  font-size: 16px;
  color: ${primary};
  margin-top: 12px;
  margin-bottom: 12px;

  ${up(breakpoints.md)}{
    font-size: 20px;
  }
  `
);

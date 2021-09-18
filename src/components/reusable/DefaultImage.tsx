import styled from "styled-components";
import { TableRowImage } from "./Table/TableRowImage";

interface IProps {
  width?: string;
  height?: string;
  border?: boolean;
  circular?: boolean;
}

const DefaultImage = ({ border, height, width, circular }: IProps) => {
  return (
    <I
      border={border}
      width={width}
      height={height}
      circular={circular}
      src="/images/logo.svg"
      alt="onow"
    />
  );
};

export default DefaultImage;
const I = styled(TableRowImage)<{
  border?: boolean;
  width?: string;
  height?: string;
  circular?: boolean;
}>`
  border: ${(props) => (props.border ? props.theme.border : "none")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => (props.circular ? "50%" : "")};
  object-fit: contain;
`;

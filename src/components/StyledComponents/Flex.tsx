import styled from "styled-components";
interface IProps {
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-evenly";
  items?: string;
  padding?: string;
  margin?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  wrap?: boolean;
  column?: boolean;
}

const Flex = styled.div<IProps>`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
`;
export default Flex;

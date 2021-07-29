import { CSSProperties, FC } from "react";
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
const Flex: FC<IProps> = ({
  children,
  items,
  justify,
  padding,
  margin,
  onClick,
  column,
  wrap,
}) => {
  return (
    <FlexWrapper
      onClick={onClick}
      column={column}
      padding={padding}
      margin={margin}
      justify={justify}
      items={items}
      style={
        {
          "--wrap": wrap ? "wrap" : "nowrap",
        } as CSSProperties
      }
    >
      {children}
    </FlexWrapper>
  );
};

export default Flex;
export const FlexWrapper = styled.div<{
  column?: boolean;
  margin?: string;
  padding?: string;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-evenly";
  items?: string;
}>`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex-wrap: var(--wrap, nowrap);
  flex-direction: ${(props) => (props.column ? "column" : "row")};
`;

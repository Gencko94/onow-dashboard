import { CSSProperties, FC } from "react";
import styled from "styled-components";
interface IProps {
  justify?: string;
  items?: string;
  padding?: string;
  margin?: string;
}
const Flex: FC<IProps> = ({ children, items, justify, padding, margin }) => {
  return (
    <FlexWrapper
      style={
        {
          "--justify": justify,
          "--items": items,
          "--padding": padding,
          "--margin": margin,
        } as CSSProperties
      }
    >
      {children}
    </FlexWrapper>
  );
};

export default Flex;
export const FlexWrapper = styled.div`
  display: flex;
  justify-content: var(--justify, normal);
  align-items: var(--items, normal);
  padding: var(--padding, 0);
  margin: var(--margin, 0);
`;

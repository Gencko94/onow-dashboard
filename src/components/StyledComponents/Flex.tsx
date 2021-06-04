import { CSSProperties, FC } from "react";
import styled from "styled-components";
interface IProps {
  justify?: string;
  items?: string;
}
const Flex: FC<IProps> = ({ children, items, justify }) => {
  return (
    <FlexWrapper
      style={{ "--justify": justify, "--items": items } as CSSProperties}
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
`;

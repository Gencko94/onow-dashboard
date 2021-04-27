import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
interface IProps {
  justify?: string;
  items?: string;
}
const Flex: FC<IProps> = ({ children, items, justify }) => {
  return (
    <Wrapper
      style={{ '--justify': justify, '--items': items } as CSSProperties}
    >
      {children}
    </Wrapper>
  );
};

export default Flex;
export const Wrapper = styled.div`
  display: flex;
  justify-content: var(--justify, normal);
  align-items: var(--items, normal);
`;

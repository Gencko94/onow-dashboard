import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
interface IProps {
  cols: string;
  gap: string;
  items?: string;
}
const Grid: FC<IProps> = ({ children, cols, gap, items }) => {
  return (
    <Wrapper
      style={
        { '--cols': cols, '--gap': gap, '--items': items } as CSSProperties
      }
    >
      {children}
    </Wrapper>
  );
};

export default Grid;
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: var(--cols);
  gap: var(--gap);
  align-items: var(--items, normal);
`;

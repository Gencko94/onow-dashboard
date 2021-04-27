import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

interface IProps {
  size: number;
}

const Paragraph: FC<IProps> = ({ children, size }) => {
  return (
    <Wrapper style={{ '--size': `${size}rem` } as CSSProperties}>
      {children}
    </Wrapper>
  );
};

export default Paragraph;
export const Wrapper = styled.p`
  font-size: var(--size);
`;

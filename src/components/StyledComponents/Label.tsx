import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

interface IProps {
  size?: string;
  mb?: string;
}

const Label: FC<IProps> = ({ children, size, mb }) => {
  return (
    <Wrapper style={{ '--size': size, '--mb': mb } as CSSProperties}>
      {children}
    </Wrapper>
  );
};

export default Label;
export const Wrapper = styled.label`
  display: block;
  font-size: var(--size, normal);
  margin-bottom: var(--mb, 0.5rem);
`;

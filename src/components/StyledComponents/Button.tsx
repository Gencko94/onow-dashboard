import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
interface IProps {
  color: string;
  size: 'sm' | 'md' | 'lg';
}
const Button: FC<IProps> = ({ children, color, size }) => {
  const resolveSize = (size: 'sm' | 'md' | 'lg') => {
    let p = '';

    switch (size) {
      case 'sm':
        p = '0.25rem 0.25rem';
        break;
      case 'md':
        p = '0.25rem 0.5rem';
        break;
      case 'lg':
        p = '0.5rem 0.75rem';
        break;
    }
    return p;
  };
  return (
    <Wrapper
      style={
        {
          '--size': resolveSize(size),
        } as CSSProperties
      }
    >
      {children}
    </Wrapper>
  );
};

export default Button;
export const Wrapper = styled.div`
  border-radius: 5px;
  padding: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
`;

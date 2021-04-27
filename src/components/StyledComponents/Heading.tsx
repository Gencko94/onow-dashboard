import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

interface IProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  mb?: number;
}

const Heading: FC<IProps> = ({ tag, children, mb }) => {
  return (
    <Wrapper style={{ '--margin-b': `${mb}rem` } as CSSProperties} as={tag}>
      {children}
    </Wrapper>
  );
};

export default Heading;
export const Wrapper = styled.h1`
  color: ${props => props.theme.headingColor};
  margin-bottom: var(--margin-b, 0);
`;

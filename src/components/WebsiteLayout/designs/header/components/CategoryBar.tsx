import { CSSProperties } from 'react';
import styled from 'styled-components';
import { CATEGORY_BAR_CATEGORY } from '../../../../../interfaces/website-layout/designs/header-design';

interface IProps {
  backgroundColor: string;
  textColor: string;
  categories: CATEGORY_BAR_CATEGORY[];
}
const CategoryBar = ({ backgroundColor, textColor, categories }: IProps) => {
  return (
    <Container
      style={
        { '--bg': backgroundColor, '--textColor': textColor } as CSSProperties
      }
    >
      {categories.map(item => (
        <div key={item.id} className="item">
          {item.name}
        </div>
      ))}
    </Container>
  );
};

export default CategoryBar;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg);
  color: var(--textColor);

  .item {
    padding: 0.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
  }
`;

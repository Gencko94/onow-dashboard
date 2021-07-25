import { CSSProperties, FC } from "react";
import styled from "styled-components";
interface IProps {
  /**
   * Specifies the ```grid-template-columns``` property
   */
  cols: string;
  /**
   * Specifies the ```grid-template-rows``` property
   */
  rows?: string;
  /**
   * Specifies the ```grid-gap``` property
   */
  gap: string;
  /**
   * Sets the ```align-items``` property
   */
  items?: string;
  /**
   * Sets the ```padding``` property.
   *
   * example : ```p={2}``` === ```2 * 0.25rem```
   */
  p?: number;
  margin?: string;
}
const Grid: FC<IProps> = ({ children, rows, cols, gap, items, p, margin }) => {
  return (
    <GridWrapper
      margin={margin}
      p={p}
      cols={cols}
      gap={gap}
      items={items}
      rows={rows}
    >
      {children}
    </GridWrapper>
  );
};

export default Grid;
export const GridWrapper = styled.div<{
  margin?: string;
  p?: number;
  cols: string;
  rows?: string;
  gap: string;
  items?: string;
}>(
  ({ theme: { breakpoints, font }, p, margin, cols, gap, items, rows }) => `

  display: grid;
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};
  gap: ${gap};
  align-items: ${items};
  padding: ${`${p! * 0.25}rem`};
  margin: ${margin};
  @media ${breakpoints.md}{
    
  }
  `
);

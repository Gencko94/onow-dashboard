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
      style={
        {
          "--cols": cols,
          "--gap": gap,
          "--items": items,
          "--rows": rows,
          "--padding": `${p! * 0.25}rem`,
          "--margin": margin,
        } as CSSProperties
      }
    >
      {children}
    </GridWrapper>
  );
};

export default Grid;
export const GridWrapper = styled.div(
  ({ theme: { breakpoints, font } }) => `

  display: grid;
  grid-template-columns: var(--cols);
  grid-template-rows: var(--rows);
  gap: var(--gap);
  align-items: var(--items, normal);
  padding: var(--padding, 0);
  margin: var(--margin, 0);
  @media ${breakpoints.md}{
    
  }
  `
);

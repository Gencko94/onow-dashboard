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
}
const Grid: FC<IProps> = ({ children, rows, cols, gap, items }) => {
  return (
    <Wrapper
      style={
        {
          "--cols": cols,
          "--gap": gap,
          "--items": items,
          "--rows": rows,
        } as CSSProperties
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
  grid-template-rows: var(--rows);
  gap: var(--gap);
  align-items: var(--items, normal);
`;

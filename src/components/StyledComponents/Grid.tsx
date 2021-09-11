import styled from "styled-components";
interface IProps {
  /**
   * Specifies the ```grid-template-columns``` property
   */
  columns?: string;
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
   * Sets the ```justify-items``` property
   */
  justify?: string;
  /**
   * Sets the ```padding``` property.
   */
  padding?: string;
  margin?: string;
}

const Grid = styled.div<IProps>`
  display: grid;

  grid-template-rows: ${(props) => props.rows};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.items};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  justify-content: ${(props) => props.justify};
  grid-template-columns: ${(props) => props.columns};
`;
export default Grid;

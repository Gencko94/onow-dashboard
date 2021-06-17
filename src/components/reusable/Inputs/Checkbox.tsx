import styled, { css } from "styled-components";

interface IProps {
  /**
   * 	```onChange``` callback function.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * 	Boolean indicated whether the input is checked.
   */
  checked: boolean;
  small?: boolean;
  id?: string;
}

const Checkbox = ({ checked, onChange, small, id }: IProps) => {
  return (
    <Container checked={checked} small={small}>
      <span className="check">
        <input id={id} type="checkbox" onChange={onChange} checked={checked} />
        <svg
          className="svg"
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {checked ? (
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
          ) : (
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
          )}
        </svg>
      </span>
    </Container>
  );
};

export default Checkbox;
const Container = styled.span<{ checked: boolean; small?: boolean }>`
  display: inline-block;
  position: relative;
  color: ${(props) => props.theme.mainColor};
  padding: 7px;

  cursor: pointer;
  font-size: 0.9rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 75ms ease;
  &:hover {
    font-weight: ${(props) => props.theme.font.semibold};
  }
  .check {
    width: 100%;
    display: flex;
    align-items: inherit;
    justify-content: inherit;
  }
  input {
    top: 0;
    left: 0;
    width: 100%;
    cursor: inherit;
    height: 100%;
    margin: 0;
    opacity: 0;
    padding: 0;
    z-index: 1;
    position: absolute;
  }

  .svg {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
  }
  ${(props) =>
    props.small &&
    css`
      padding: 5px 3px;
      .svg {
        width: 0.75em;
        height: 0.75em;
      }
    `}
`;

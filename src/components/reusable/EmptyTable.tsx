import styled from "styled-components";

interface BaseProps {
  /**
   * Text to show in the Empty Table.
   */
  text: string;
}
interface WithButton extends BaseProps {
  /**
   * Adds a button to the ```div```
   * Providing ```withButton``` will require ```btnText``` and ```cb```.
   */
  withButton: boolean;
  btnText?: string;
  cb?: () => void;
}
interface WithoutButton extends BaseProps {
  cb?: never;
  btnText?: never;
  withButton?: never;
}
type IProps = WithButton | WithoutButton;

const EmptyTable = ({ btnText, text, withButton, cb }: IProps) => {
  return (
    <Container>
      <p>{text}</p>
      {withButton && (
        <button onClick={() => cb?.()} type="button">
          {btnText}
        </button>
      )}
    </Container>
  );
};

export default EmptyTable;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor } }) => `
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    // height:200px;
    height:100%;
    p {
      margin-bottom:0.5rem;
    }
    button {
      background-color:${mainColor};
      color:#fff;
      padding:0.5rem;
      font-size:0.9rem;
      border-radius:6px;
      transition:transform 75ms ease;
      &:hover {
      transform:translateY(-2px);
      }
    }
`
);

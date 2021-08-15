import styled from "styled-components";
import Heading from "../StyledComponents/Heading";
import Button from "./Button";

interface BaseProps {
  /**
   * Text to show in the Empty Table.
   */
  text: string;
  /**
   * Container ```height```
   */
  height: string;
  iconImage?: string;
}
interface WithButton extends BaseProps {
  /**
   * Adds a button to the ```div```
   * Providing ```withButton``` will require ```btnText``` and ```cb```.
   */
  withButton?: boolean;
  btnText?: string;
  cb?: () => void;
}
interface WithoutButton extends BaseProps {
  cb?: never;
  btnText?: never;
  withButton?: never;
}
type IProps = WithButton | WithoutButton;

const EmptyTable = ({
  btnText,
  text,
  withButton,
  cb,
  height,
  iconImage,
}: IProps) => {
  return (
    <Container height={height}>
      {iconImage && <img src={iconImage} alt="" />}
      <Heading tag="h5" type="medium-title">
        {text}
      </Heading>
      {withButton && btnText && (
        <Button color="green" withTransition onClick={() => cb?.()}>
          {btnText}
        </Button>
      )}
    </Container>
  );
};

export default EmptyTable;
const Container = styled.div<{ height: string }>(
  ({ theme: { breakpoints, font }, height }) => `
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    height:${height};
    p.title {
      margin-bottom:0.5rem;
      font-size:1.1rem;
      font-weight:${font.semibold};
      margin:1.5rem 0;
    }
    img {
      max-height:100px;
    }
   
`
);

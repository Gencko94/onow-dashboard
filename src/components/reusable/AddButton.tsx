import { BiPlus } from "react-icons/bi";
import { useHistory } from "react-router";
import styled from "styled-components";

interface BaseButton {
  /**
   * Specifies the button's text.
   */
  title: string;
}
interface ButtonWithTarget extends BaseButton {
  /**
   * If provided the button will behave as a link, and target is the ```href``` target.
   *
   * Providing this prop will disable ```cb``` prop.
   */
  target?: string;
  cb?: never;
}
interface ButtonWithCB extends BaseButton {
  /**
   * If provided the button will behave as a button. and ```cb``` is the  ```onClick``` callback function.
   *
   * Providing this prop will disable ```target``` prop.
   */
  cb: () => void;
  target?: never;
}
type IProps = ButtonWithCB | ButtonWithTarget;

const AddButton = ({ target, title, cb }: IProps) => {
  const history = useHistory();
  return (
    <Button onClick={() => (cb ? cb() : target && history.push(target))}>
      <span className="icon">
        <BiPlus size={30} />
      </span>
      <p>{title}</p>
    </Button>
  );
};

export default AddButton;

const Button = styled.button(
  ({ theme: { breakpoints, green, shadow } }) => `
    background-color: ${green};
    box-shadow: ${shadow};
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    position: relative;
    color: #fff;
    transition:transform 75ms ease;
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p {
      font-size:0.9rem;
      margin: 0 0.25rem;
    }
    &:hover {
      transform:translateY(-2px);
    }
    `
);

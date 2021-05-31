import { BiPlus } from "react-icons/bi";
import { MdCheck } from "react-icons/md";
import { useHistory } from "react-router";
import styled from "styled-components";

interface IProps {
  /**
   * Specifies the button's text.
   */
  title: string;
  /**
   * ```cb``` is the  ```onClick``` callback function.
   */
  cb: () => void;
}

const SuccessButton = ({ title, cb }: IProps) => {
  return (
    <Button type="button" onClick={() => cb()}>
      <span className="icon">
        <MdCheck size={23} />
      </span>
      <p>{title}</p>
    </Button>
  );
};

export default SuccessButton;

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

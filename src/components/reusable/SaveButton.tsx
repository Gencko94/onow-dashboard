import { MdSave } from "react-icons/md";
import styled from "styled-components";
interface IProps {
  /**
   * Specifies the button's text.
   */
  title: string;
  /**
   * ```onClick``` handler
   */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The ```type``` of the button.
   */
  type?: "submit" | "button";
}
const SaveButton = ({ title, onClick, type = "button" }: IProps) => {
  return (
    <Button type={type} onClick={onClick}>
      <span className="icon">
        <MdSave size={30} />
      </span>
      <p>{title}</p>
    </Button>
  );
};

export default SaveButton;

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

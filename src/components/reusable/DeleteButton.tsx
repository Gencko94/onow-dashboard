import { BiPlus } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";

interface IProps {
  title: string;
  cb: () => void;
}

const DeleteButton = ({ cb, title }: IProps) => {
  return (
    <Button onClick={() => cb()}>
      <span className="icon">
        <RiDeleteBinLine size={25} />
      </span>
      <p>{title}</p>
    </Button>
  );
};

export default DeleteButton;

const Button = styled.button(
  ({ theme: { breakpoints, dangerRed, shadow } }) => `
    background-color: ${dangerRed};
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

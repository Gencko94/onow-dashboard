import { BiPlus } from "react-icons/bi";
import { useHistory } from "react-router";
import styled from "styled-components";

interface IProps {
  title: string;
  target: string;
}

const AddButton = ({ target, title }: IProps) => {
  const history = useHistory();
  return (
    <Button onClick={() => history.push(target)}>
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
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p {
      font-size:0.9rem;
      margin: 0 0.25rem;
    }
    `
);

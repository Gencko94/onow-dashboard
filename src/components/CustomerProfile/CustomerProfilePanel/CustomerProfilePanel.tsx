import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteButton from "../../reusable/DeleteButton";

const CustomerProfilePanel = () => {
  return (
    <Container>
      <button>
        <span className="icon">
          <MdEdit size={20} />
        </span>
        <p>Edit Customer </p>
      </button>
      {/* <button>
        <span className="icon">
          <BiMessageRoundedDots size={20} />
        </span>
        <p>Send Message </p>
      </button> */}
      <DeleteButton cb={() => {}} title="Delete Customer" />
    </Container>
  );
};

export default CustomerProfilePanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 5px;

    p {
      margin: 0 0.5rem;
      font-size: 0.9rem;
    }
    span.icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  button.delete {
    background-color: ${(props) => props.theme.dangerRed};
    color: ${(props) => props.theme.btnText};
  }
`;

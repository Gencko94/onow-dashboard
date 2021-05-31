import { BiMessageRoundedDots } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
import DeleteButton from "../../reusable/DeleteButton";

const OrderPanel = () => {
  return (
    <Container>
      <button>
        <span className="icon">
          <MdEdit size={20} />
        </span>
        <p>Edit Order </p>
      </button>
      <button>
        <span className="icon">
          <BiMessageRoundedDots size={20} />
        </span>
        <p>Send Message </p>
      </button>
      <DeleteButton cb={() => {}} title="Delete Order" />
    </Container>
  );
};

export default OrderPanel;
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
    border-radius: 6px;

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
`;

import { Dispatch, SetStateAction } from "react";

import styled from "styled-components";
import AddButton from "../../reusable/AddButton";
interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomersPanel = ({ setModalOpen }: IProps) => {
  return (
    <Container>
      <AddButton title="Add New Customer" cb={() => setModalOpen(true)} />
    </Container>
  );
};

export default CustomersPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

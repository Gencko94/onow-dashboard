import { Dispatch, SetStateAction } from "react";
import { BsPlus } from "react-icons/bs";

import styled from "styled-components";
import Button from "../../reusable/Button";
interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomersPanel = ({ setModalOpen }: IProps) => {
  return (
    <Container>
      <Button
        Icon={BsPlus}
        bg="green"
        padding="0.5rem"
        text="Add New Customer"
        onClick={() => setModalOpen(true)}
        withRipple
        withTransition
      />
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

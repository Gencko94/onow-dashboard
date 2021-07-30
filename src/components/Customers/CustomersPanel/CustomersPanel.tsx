import { Dispatch, SetStateAction } from "react";
import { BsPlus } from "react-icons/bs";

import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";
interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomersPanel = ({ setModalOpen }: IProps) => {
  return (
    <Flex margin="1rem 0" justify="space-between" items="center">
      <Heading tag="h2" weight="bold">
        Customers
      </Heading>
      <Button
        Icon={BsPlus}
        bg="green"
        padding="0.5rem"
        text="Add New Customer"
        onClick={() => setModalOpen(true)}
        withRipple
        textSize="0.9rem"
        withTransition
      />
    </Flex>
  );
};

export default CustomersPanel;

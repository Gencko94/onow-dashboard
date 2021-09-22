import { Dispatch, SetStateAction } from "react";

import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";
interface IProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomersPanel = ({ setModalOpen }: IProps) => {
  return (
    <Flex margin="1rem 0" justify="space-between" items="center">
      <Heading tag="h2" type="large-title">
        Customers
      </Heading>
      <Button color="green" onClick={() => setModalOpen(true)} withTransition>
        Add New Customer
      </Button>
    </Flex>
  );
};

export default CustomersPanel;

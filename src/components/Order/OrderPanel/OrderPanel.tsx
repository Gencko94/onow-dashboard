import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";

const OrderPanel = () => {
  return (
    <Flex items="center" padding="0.75rem" justify="flex-end">
      <Button
        bg="transparent"
        color="#252525"
        padding="0.5rem 0.5rem"
        withRipple
        withTransition
        textSize="0.9rem"
        Icon={MdEdit}
        iconSize={20}
        border
        margin="0 0.5rem"
        hoverBg="green"
        hoverColor="#fff"
      >
        Edit Order
      </Button>

      <Button
        bg="danger"
        padding="0.5rem 0.5rem"
        withRipple
        withTransition
        textSize="0.9rem"
        Icon={RiDeleteBinLine}
        iconSize={20}
      >
        Delete Order
      </Button>
    </Flex>
  );
};

export default OrderPanel;

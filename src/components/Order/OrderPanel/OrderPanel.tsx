import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";

const OrderPanel = () => {
  return (
    <Flex items="center" padding="0.75rem" justify="flex-end">
      <Button withTransition margin="0 0.5rem">
        Edit Order
      </Button>

      <Button color="danger" withTransition>
        Delete Order
      </Button>
    </Flex>
  );
};

export default OrderPanel;

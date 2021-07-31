import { IoAddOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";

import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";

const CouponsPanel = () => {
  const history = useHistory();
  return (
    <Flex margin="1rem 0" justify="space-between" items="center">
      <Heading tag="h2" weight="bold">
        Coupons
      </Heading>
      <Button
        bg="green"
        onClick={() => history.push("/coupons/create")}
        padding="0.5rem"
        withRipple
        Icon={IoAddOutline}
        iconSize={25}
        withTransition
        textSize="0.9rem"
      >
        Create new Coupon
      </Button>
    </Flex>
  );
};

export default CouponsPanel;

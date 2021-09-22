import { useHistory } from "react-router-dom";

import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";

const CouponsPanel = () => {
  const history = useHistory();
  return (
    <Flex margin="1rem 0" justify="space-between" items="center">
      <Heading tag="h2" type="large-title">
        Coupons
      </Heading>
      <Button
        color="green"
        onClick={() => history.push("/coupons/create")}
        withTransition
      >
        Create new Coupon
      </Button>
    </Flex>
  );
};

export default CouponsPanel;

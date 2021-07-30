import ProductsPanelActions from "./ProductsPanelActions/ProductPanelActions";
import { useHistory } from "react-router";

import Flex from "../../StyledComponents/Flex";
import Button from "../../reusable/Button";
import { BiPlus } from "react-icons/bi";
import Heading from "../../StyledComponents/Heading";
const ProductsPanel = () => {
  const history = useHistory();
  return (
    <Flex justify="space-between" items="center" margin="1rem 0">
      <Heading tag="h2" weight="bold">
        Products
      </Heading>
      <Button
        onClick={() => history.push("/products/product/create")}
        bg="green"
        padding="0.5rem"
        textSize="0.9rem"
        text="Create New Product"
        withRipple
        withTransition
        Icon={BiPlus}
      />
      {/* <ProductsPanelActions /> */}
    </Flex>
  );
};

export default ProductsPanel;

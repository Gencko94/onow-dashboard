import ProductsPanelActions from "./ProductsPanelActions/ProductPanelActions";
import { useHistory } from "react-router";

import Flex from "../../StyledComponents/Flex";
import Button from "../../reusable/Button";
import { BiPlus } from "react-icons/bi";
const ProductsPanel = () => {
  const history = useHistory();
  return (
    <Flex justify="flex-end" items="center" padding="0.75rem">
      <Button
        onClick={() => history.push("/products/product/create")}
        bg="green"
        padding="0.25rem"
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

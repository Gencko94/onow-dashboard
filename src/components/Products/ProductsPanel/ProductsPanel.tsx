import ProductsPanelActions from "./ProductsPanelActions/ProductsPanelActions";
import { useHistory } from "react-router";

import Flex from "../../StyledComponents/Flex";
import Button from "../../reusable/Button";
import { BiPlus } from "react-icons/bi";
import Heading from "../../StyledComponents/Heading";
import { IoMdAdd } from "react-icons/io";
import IconWrapper from "../../reusable/Icon";
const ProductsPanel = () => {
  const history = useHistory();
  return (
    <Flex justify="space-between" items="center" margin="1rem 0">
      <Heading tag="h2" weight="bold">
        Products
      </Heading>
      <Button
        onClick={() => history.push("/products/product/create")}
        color="green"
        withTransition
        size="lg"
      >
        <IconWrapper Icon={IoMdAdd} />
        Create New Product
      </Button>
      {/* <ProductsPanelActions /> */}
    </Flex>
  );
};

export default ProductsPanel;

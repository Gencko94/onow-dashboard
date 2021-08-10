import ProductsPanelActions from "./ProductsPanelActions/ProductsPanelActions";
import { useHistory } from "react-router";

import Flex from "../../StyledComponents/Flex";
import Button from "../../reusable/Button";
import { BiPlus } from "react-icons/bi";
import Heading from "../../StyledComponents/Heading";
import { IoMdAdd } from "react-icons/io";
import IconWrapper from "../../reusable/Icon";
import { useState } from "react";
import Portal from "../../Portal/Portal";
import Tooltip from "../../Tooltip/Tooltip";
import TooltipPopover from "../../Tooltip/TooltipPopover";
const ProductsPanel = () => {
  const [coords, setCoords] = useState<Partial<{ top: number; left: number }>>(
    {}
  ); // takes current button coordinates
  const [isOn, setOn] = useState(false); // toggles button visibility
  const history = useHistory();
  return (
    <Flex justify="space-between" items="center" margin="1rem 0">
      <Heading tag="h2" type="large-title">
        Products
      </Heading>
      <Button
        onClick={() => history.push("/products/product/create")}
        color="primary"
        withTransition
        size="md"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords({
            left: rect.x + rect.width / 4,
            top: rect.y - 50,
          });
          setOn(true); // [ 3 ]
        }}
        onMouseLeave={(e) => {
          setCoords({});
          setOn(false);
        }}
      >
        <IconWrapper Icon={IoMdAdd} />
        Create New Product
      </Button>
      {/* {isOn && (
        <Portal>
          <TooltipPopover coords={coords}>
         
            <Tooltip />
          </TooltipPopover>
        </Portal>
      )} */}
      {/* <ProductsPanelActions /> */}
    </Flex>
  );
};

export default ProductsPanel;

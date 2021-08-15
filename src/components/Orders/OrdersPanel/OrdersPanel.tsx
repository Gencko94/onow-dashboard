import { Dispatch, SetStateAction, useState } from "react";

import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { ORDERS_FILTERS } from "../../../interfaces/orders/orders";

import Button from "../../reusable/Button";
import Spacer from "../../reusable/Spacer";
import Flex from "../../StyledComponents/Flex";
import Heading from "../../StyledComponents/Heading";
import OrdersFilters from "./OrdersFilters/OrdersFilters";
interface IProps {
  filters: ORDERS_FILTERS;
  setFilters: Dispatch<SetStateAction<ORDERS_FILTERS>>;
}
const OrdersPanel = ({ setFilters, filters }: IProps) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  return (
    <>
      <Flex margin="1rem 0" items="center" justify="space-between">
        <Heading tag="h2" type="large-title">
          Orders
        </Heading>
        <Flex items="center">
          <Button
            color="green"
            onClick={() => history.push("/orders/create")}
            withTransition
          >
            Create new Order
          </Button>
          <Spacer size={10} />
          <Button color="green" onClick={() => setOpen(!open)} withTransition>
            Filter orders
          </Button>
        </Flex>
      </Flex>
      <CSSTransition
        in={open}
        classNames="orders-filter"
        timeout={250}
        unmountOnExit
      >
        <OrdersFilters open={open} filters={filters} setFilters={setFilters} />
      </CSSTransition>
    </>
  );
};

export default OrdersPanel;

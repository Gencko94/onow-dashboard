import { Dispatch, SetStateAction, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { VscFilter } from "react-icons/vsc";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { ORDERS_FILTERS } from "../../../interfaces/orders/orders";
import AddButton from "../../reusable/AddButton";
import Button from "../../reusable/Button";
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
        <Heading tag="h2" weight="bold">
          Orders
        </Heading>
        <Flex items="center">
          <Button
            Icon={BsPlus}
            bg="green"
            padding="0.5rem"
            onClick={() => history.push("/orders/create")}
            withRipple
            textSize="0.9rem"
            withTransition
          >
            Create new Order
          </Button>
          <Button
            Icon={VscFilter}
            bg="green"
            padding="0.5rem"
            iconSize={30}
            onClick={() => setOpen(!open)}
            withRipple
            textSize="0.9rem"
            margin="0 0.5rem"
            withTransition
          >
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

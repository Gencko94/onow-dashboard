import { Dispatch, SetStateAction, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { VscFilter } from "react-icons/vsc";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { ORDERS_FILTERS } from "../../../interfaces/orders/orders";
import AddButton from "../../reusable/AddButton";
import OrdersFilters from "./OrdersFilters/OrdersFilters";
interface IProps {
  filters: ORDERS_FILTERS;
  setFilters: Dispatch<SetStateAction<ORDERS_FILTERS>>;
}
const OrdersPanel = ({ setFilters, filters }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container>
        <AddButton target="/orders/create" title="Create New Order" />

        <button onClick={() => setOpen(!open)} className="filter-btn">
          <Icon>
            <VscFilter size={15} />
          </Icon>
          <p>Filter</p>
        </button>
      </Container>
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
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  button {
    display: flex;
    align-items: center;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
  }

  .filter-btn {
    background-color: ${(props) => props.theme.green};
    box-shadow: ${(props) => props.theme.shadow};

    position: relative;

    background-color: #f0f0f0;
  }
  p {
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    margin: 0 0.5rem;
  }
`;
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

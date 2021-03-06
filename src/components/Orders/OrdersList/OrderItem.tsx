import { parseISO } from "date-fns";
import format from "date-fns/format";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BsThreeDotsVertical } from "react-icons/bs";

import { RiDeleteBinLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { ORDER } from "../../../interfaces/orders/orders";
import OrderStatusChip from "../../reusable/OrderStatusChip";
import PaymentStatusChip from "../../reusable/PaymentStatusChip";
interface IProps {
  order: ORDER;
}

const OrderItem = ({ order }: IProps) => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/orders/${order.order_id}`)}>
      {/* <div className="field">
        <CheckboxContainer>
          <BsCheck size={15} />
        </CheckboxContainer>
      </div> */}
      <div className="field">
        <h6>{order.order_id}</h6>
      </div>
      <div className="field">
        <h6>{`${order.order_customer?.first_name} ${order.order_customer?.last_name}`}</h6>
      </div>
      <div className="field">
        <h6>{`${order.order_type === "delivery" ? "Delivery" : "Pickup"}`}</h6>
      </div>
      <div className="field">
        <h6>{`${
          order.payment_type === "cash" ? "Cash on Delivery" : "Online"
        }`}</h6>
      </div>
      <div className="field">
        <PaymentStatusChip dots status={order.payment_status} />
      </div>
      <div className="field">
        <OrderStatusChip dots status={order.order_status} />
      </div>
      <div className="field">
        <h6>{format(parseISO(order.created_at), "dd/MM/yyyy")}</h6>
      </div>
      <div className="field">
        <ButtonsContainer>
          <ActionButtonContainer
            onClick={(e) => {
              e.stopPropagation();
              setActionsMenuOpen(true);
            }}
          >
            <button className="icon">
              <BsThreeDotsVertical size={18} />
            </button>
            <CSSTransition
              in={actionsMenuOpen}
              classNames="menu"
              unmountOnExit
              timeout={100}
            >
              <ClickAwayListener onClickAway={() => setActionsMenuOpen(false)}>
                <ul>
                  <li>
                    <button>
                      <span className="icon">
                        <RiDeleteBinLine size={15} />
                      </span>
                      <p>Delete</p>
                    </button>
                  </li>
                </ul>
              </ClickAwayListener>
            </CSSTransition>
          </ActionButtonContainer>
        </ButtonsContainer>
      </div>
    </Container>
  );
};

export default OrderItem;
const Container = styled.div(
  ({ theme: { breakpoints, border, font, subtleBackground } }) => `
  background-color: ${subtleBackground};
  cursor: pointer;
  display: grid;
  grid-template-columns: 0.25fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  border-bottom: ${border};
  &:hover {
    background-color: ${subtleBackground};
  }
  
  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    text-align: center;
  }
  h6 {
    font-size: 0.8rem;
    font-weight: ${font.semibold};
  }
  @media ${breakpoints.xl}{
    h6 {
      font-weight: ${font.regular};
      font-size: 1rem;
    }

  }
  `
);

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  button.icon {
    display: inline-block;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transition: all 75ms ease;
    &:hover {
      background-color: #e6e6e6;
    }
  }
`;
const ActionButtonContainer = styled.div`
  position: relative;

  ul {
    position: absolute;
    bottom: -3px;
    right: 8px;
    z-index: 10;
    background-color: #fff;
    transform-origin: right;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 5px;
  }
  ul li button {
    padding: 0.5rem;
    display: block;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    color: ${(props) => props.color};
    transition: all 75ms ease;
    &:hover {
      color: ${(props) => props.theme.text};
      background-color: ${(props) => props.theme.subtleBackground};
    }
    p {
      margin: 0 0.5rem;
    }
  }
  span.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
  }
`;

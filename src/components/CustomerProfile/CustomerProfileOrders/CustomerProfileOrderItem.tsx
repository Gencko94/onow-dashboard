import { format, parseISO } from "date-fns";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useTranslation } from "react-i18next";
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

const CustomerProfileOrderItem = ({ order }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const history = useHistory();
  return (
    <Container onClick={() => history.push(`/orders/${order.order_id}`)}>
      <div className="field">
        <h6>{order.order_id}</h6>
      </div>
      <div className="field">
        <h6>{order.order_type}</h6>
      </div>
      <div className="field">
        <h6>5kd</h6>
      </div>
      <div className="field">
        <PaymentStatusChip dots status={order.payment_status[0]} />
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

export default CustomerProfileOrderItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  border-bottom: ${(props) => props.theme.border};
  &:hover {
    background-color: ${(props) => props.theme.highlightColor};
  }
  button.icon {
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 75ms ease;
    &:hover {
      background-color: #e6e6e6;
    }
  }
  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      font-weight: ${(props) => props.theme.font.bold};
    }
  }
`;
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
      color: ${(props) => props.theme.headingColor};
      background-color: ${(props) => props.theme.highlightColor};
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

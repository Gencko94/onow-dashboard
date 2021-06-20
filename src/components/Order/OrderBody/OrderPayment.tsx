import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePhone, AiOutlineWhatsApp } from "react-icons/ai";
import { HiOutlineMail, HiOutlineArchive } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import Flex from "../../StyledComponents/Flex";
import OrderStatusChip from "../../reusable/OrderStatusChip";
import PaymentStatusChip from "../../reusable/PaymentStatusChip";
import Grid, { GridWrapper } from "../../StyledComponents/Grid";
import { PAYMENT_STATUS } from "../../../interfaces/orders/orders";

interface IProps {
  paymentStatus: PAYMENT_STATUS;
  paymentType: string;
}

const OrderPayment = ({ paymentStatus, paymentType }: IProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Container>
      <div className="title-container">
        <h6 className="title">Order Payment </h6>
      </div>
      <div className="content">
        <Grid items="center" p={3} cols="auto 1fr" gap="0.25rem">
          <p className="label">Payment Type : </p>
          <p className="value">Visa</p>
        </Grid>
        <Grid items="center" p={3} cols="auto 1fr" gap="0.25rem">
          <p className="label">Payment Status </p>
          <PaymentStatusChip
            dots
            status={{
              id: 2,
              title: {
                en: "Paid",
                ar: "مدفوع",
              },
            }}
          />
        </Grid>
      </div>
    </Container>
  );
};

export default OrderPayment;
const Container = styled.div`
  padding: 1rem;
  .title-container {
    color: ${(props) => props.theme.mainColor};
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    background-color: #fff;
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 6px;
    overflow: hidden;
    p.label {
      color: ${(props) => props.theme.subHeading};
      font-size: 0.9rem;
    }
    p.value {
      font-size: 0.9rem;
      margin: 0 0.25rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
  }
  ${GridWrapper} {
    border-bottom: ${(props) => props.theme.border};
  }
`;

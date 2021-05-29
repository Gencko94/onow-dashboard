import { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Modal from "../../Modal/Modal";
import ChangeOrderStatusModalBody from "./ChangeOrderStatusModalBody";

const OrderInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const generateOrderStatusDiv = (id: number) => {
    switch (id) {
      case 1:
        return (
          <OrderStatusContainer
            color="#a13b00"
            onClick={() => setModalOpen(true)}
          >
            <p>Waiting for Payment</p>
            <MdKeyboardArrowRight size={18} />
          </OrderStatusContainer>
        );
      case 2:
        return (
          <OrderStatusContainer
            color="#f8d300"
            onClick={() => setModalOpen(true)}
          >
            <p>Waiting for Payment</p>
            <MdKeyboardArrowRight size={18} />
          </OrderStatusContainer>
        );

      case 3:
        return <OrderStatusContainer></OrderStatusContainer>;
      case 4:
        return <OrderStatusContainer></OrderStatusContainer>;
      case 5:
        return <OrderStatusContainer></OrderStatusContainer>;
      case 6:
        return <OrderStatusContainer></OrderStatusContainer>;
      case 7:
        return <OrderStatusContainer></OrderStatusContainer>;

      default:
        return <OrderStatusContainer></OrderStatusContainer>;
    }
  };
  return (
    <Container ref={ref}>
      <div className="title-container">
        <h6 className="title">Order Information </h6>
      </div>
      <div className="content">
        <div className="flex">
          <p className="label">Order Status : </p>
          {generateOrderStatusDiv(1)}
        </div>
        <div className="flex">
          <p className="label">Order Date : </p>
          <p className="value">1/1/2021 18:00 AM</p>
        </div>
        <div className="flex">
          <p className="label">Payment Mode :</p>
          <p className="value">Cash On Delivery</p>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        title="Change order Status"
        closeFunction={() => setModalOpen(false)}
      >
        <ChangeOrderStatusModalBody portal={ref} />
      </Modal>
    </Container>
  );
};

export default OrderInfo;
const Container = styled.div`
  background: ${(props) => props.color};
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 5px;

  .title-container {
    padding: 0.75rem;
    background-color: ${(props) => props.theme.overlayColor};
    border-bottom: ${(props) => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-weight: ${(props) => props.theme.font.xbold};
  }
  .flex {
    padding: 0.5rem 0.5rem;
    display: flex;
    /* gap: 5px; */
    align-items: center;

    /* grid-template-columns: auto 1fr; */

    p.label {
      color: ${(props) => props.theme.subHeading};
      /* font-size: 0.9rem; */
    }
    p.value {
      font-size: 0.9rem;
      margin: 0 0.25rem;
      font-weight: ${(props) => props.theme.font.semibold};
    }
  }
`;
const OrderStatusContainer = styled.button`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  color: #fff;
  p {
    margin: 0 0.25rem;
    font-size: 0.8rem;
  }
`;

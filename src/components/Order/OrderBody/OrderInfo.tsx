import { parseISO } from "date-fns";
import { format } from "date-fns/esm";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Select, { GroupTypeBase, Styles } from "react-select";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { orderStatuses } from "../../../fakeData/fakeOrderStatuses";
import { ORDER_STATUS } from "../../../interfaces/orders/orders";
import Modal from "../../Modal/Modal";
import OrderStatusChip from "../../reusable/OrderStatusChip";
import Flex, { FlexWrapper } from "../../StyledComponents/Flex";
import Grid, { GridWrapper } from "../../StyledComponents/Grid";
import ChangeOrderStatusModalBody from "./ChangeOrderStatusModalBody";

interface IProps {
  date: string;
  orderStatus: ORDER_STATUS;
  orderId: number;
}

const OrderInfo = ({ date, orderId, orderStatus }: IProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    i18n: { language },
  } = useTranslation();
  const resolveColor = (id: number) => {
    switch (id) {
      case 1:
        return "#f8d300";
      case 2:
        return "#1b5bff";
      case 3:
        return "#2dd4eb";
      case 4:
        return "#02be02";
      case 5:
        return "#e60f07";
    }
  };
  const selectStyles:
    | Partial<Styles<any, false, GroupTypeBase<any>>>
    | undefined = useMemo(() => {
    return {
      control: (provided) => ({
        ...provided,
        fontSize: "0.9rem",
        minHeight: "35px",
        backgroundColor: resolveColor(orderStatus.id),
        border: "none",
        color: "#fff",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        padding: "6px",
        display: "grid",
        color: "#fff",
      }),
      option: (provided) => ({
        ...provided,
        fontSize: "0.9rem",
      }),
      menu: (provided) => ({
        ...provided,

        zIndex: 200,
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "#fff",
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        color: "#fff",
      }),
    };
  }, []);
  return (
    <Container>
      <Grid cols="1fr 1fr 1fr" gap="1rem" p={2}>
        <Flex items="center" justify="flex-start">
          <p className="label">Order Number</p>
          <p className="value">{orderId}</p>
        </Flex>
        <Flex items="center" justify="center">
          <p className="label">Order Date</p>
          <p className="value">
            {format(parseISO(date), "dd-MM-yyyy / HH:mm:ss")}
          </p>
        </Flex>
        <Flex items="center">
          <p className="label">Order Status</p>
          <div className="value" style={{ flex: 1 }}>
            <Select
              options={orderStatuses}
              onChange={(option) => {}}
              value={orderStatus}
              styles={selectStyles}
              getOptionLabel={(option) => option.title[language]}
              getOptionValue={(option) => option.id.toString()}
            />
          </div>
        </Flex>
      </Grid>
      {/* <Modal
        isOpen={modalOpen}
        title="Change order Status"
        closeFunction={() => setModalOpen(false)}
      >
        <ChangeOrderStatusModalBody portal={ref} />
      </Modal> */}
    </Container>
  );
};

export default OrderInfo;
const Container = styled.div`
  border-bottom: ${(props) => props.theme.border};
  background: ${(props) => props.color};
  p {
    font-size: 0.9rem;
  }
  p.label {
    color: ${(props) => props.theme.mainColor};
    font-weight: ${(props) => props.theme.font.semibold};
  }
  .value {
    color: ${(props) => props.theme.subHeading};
    margin: 0 0.5rem;
  }
`;

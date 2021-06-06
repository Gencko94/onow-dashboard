import { useTranslation } from "react-i18next";

import styled from "styled-components";

import { STORE_ORDERS_STAT } from "../../../interfaces/orders/orders";

import { FcApprove, FcCancel, FcServices, FcShipped } from "react-icons/fc";

interface IProps {
  status: STORE_ORDERS_STAT;
}

const OrderThumbnail = ({ status }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const generateIcon = (id: number) => {
    switch (id) {
      case 1:
        return (
          <Icon>
            <FcApprove size={40} />
          </Icon>
        );
      case 2:
        return (
          <Icon>
            <FcServices size={40} />
          </Icon>
        );

      case 3:
        return (
          <Icon>
            <FcShipped size={40} />
          </Icon>
        );
      case 4:
        return (
          <Icon>
            <FcShipped size={40} />
          </Icon>
        );
      case 5:
        return (
          <Icon>
            <FcCancel size={40} />
          </Icon>
        );
    }
  };
  return (
    <Container>
      {generateIcon(status.id)}
      <div>
        <p className="label">{status.title[language]}</p>
        <p className="value">{status.value}</p>
      </div>
    </Container>
  );
};

export default OrderThumbnail;
const Container = styled.div`
  background-color: #fff;
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 1rem 0.4rem;
  padding: 0.75rem;

  p.label {
    color: ${(props) => props.theme.subHeading};
    font-size: 0.9rem;
    font-weight: ${(props) => props.theme.font.regular};
    margin-bottom: 0.25rem;
  }
  p.value {
    font-size: 1.2rem;
    font-weight: ${(props) => props.theme.font.bold};
  }
`;
const Icon = styled.span`
  align-self: center;
  /* box-shadow: ${(props) => props.theme.shadow};
  border-radius: 50%; */
  /* padding: 0.5rem; */
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  color: #fff;
`;

import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { PAYMENT_STATUS } from "../../interfaces/orders/orders";

interface IProps {
  status: PAYMENT_STATUS;
  withBg?: boolean;
  dots?: boolean;
}

const PaymentStatusChip = ({ status, withBg, dots }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const resolveColor = (id: number) => {
    switch (id) {
      case 1:
        return "#f8d300";

      case 2:
        return "#02be02";
    }
  };
  return (
    <Container bg={withBg ? resolveColor(status.id) : undefined}>
      {dots ? <Dot color={resolveColor(status.id)} /> : ""}
      <p>{status.title[language]}</p>
    </Container>
  );
};

export default PaymentStatusChip;
const Container = styled.div<{ bg?: string }>(
  ({ theme: { breakpoints, font }, bg }) => `
  display: flex;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  p {
    font-size: 0.8rem;
    margin: 0 0.25rem;
  }
  justify-content: center;
  @media ${breakpoints.xl}{
    p {
      font-weight: ${font.regular};
      font-size: 1rem;
    }

  }
  ${
    bg &&
    css`
      background-color: ${bg};
      color: #fff;
      padding: 0.25rem;
      p {
        margin: 0;
      }
    `
  };
    `
);
const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

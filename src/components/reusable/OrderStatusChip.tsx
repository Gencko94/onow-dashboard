import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { ORDER_STATUS } from '../../interfaces/orders/orders';

interface IProps {
  status: ORDER_STATUS;
  withBg?: boolean;
  dots?: boolean;
}

const OrderStatusChip = ({ status, withBg, dots }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const resolveColor = (id: number) => {
    switch (id) {
      case 1 || 2 || 3:
        return '#f8d300';
      case 4:
        return '#1b5bff';
      case 5:
        return '#2dd4eb';
      case 6:
        return '#02be02';
      case 7:
        return '#e60f07';
    }
  };
  return (
    <Container bg={withBg ? resolveColor(status.status_id) : undefined}>
      {dots ? <Dot color={resolveColor(status.status_id)} /> : ''}
      <p>{status.title[language]}</p>
    </Container>
  );
};

export default OrderStatusChip;
const Container = styled.div<{ bg?: string }>`
  display: flex;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  p {
    font-size: 0.8rem;
    margin: 0 0.25rem;
  }
  justify-content: center;
  ${props =>
    props.bg &&
    css`
      background-color: ${props.bg};
      color: #fff;
      padding: 0.25rem;
      p {
        margin: 0;
      }
    `};
`;
const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

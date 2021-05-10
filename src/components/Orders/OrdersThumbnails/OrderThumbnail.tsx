import { useTranslation } from 'react-i18next';
import { MdAttachMoney } from 'react-icons/md';
import styled from 'styled-components';
import { VscOpenPreview, VscServerProcess } from 'react-icons/vsc';
import { BsGear } from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { STORE_ORDERS_STAT } from '../../../interfaces/orders/orders';

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
          <Icon color="#a13b00">
            <MdAttachMoney size={22} />
          </Icon>
        );
      case 2:
        return (
          <Icon color="#f8d300">
            <VscOpenPreview size={22} />
          </Icon>
        );

      case 3:
        return (
          <Icon color="#2dd4eb">
            <BsGear size={22} />
          </Icon>
        );
      case 4:
        return (
          <Icon color="#02be02">
            <VscServerProcess size={22} />
          </Icon>
        );
      case 5:
        return (
          <Icon color="#00a0a0">
            <FiTruck size={22} />
          </Icon>
        );
      case 6:
        return (
          <Icon color="#02be02">
            <FiTruck size={22} />
          </Icon>
        );
      case 7:
        return (
          <Icon color="#b72b2b">
            <IoMdClose size={22} />
          </Icon>
        );

      default:
        return (
          <Icon color="#fff">
            <BsGear />
          </Icon>
        );
    }
  };
  return (
    <Container>
      {generateIcon(status.status_id)}
      <div>
        <p className="label">{status.title[language]}</p>
        <p className="value">{status.value}</p>
      </div>
    </Container>
  );
};

export default OrderThumbnail;
const Container = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  gap: 0.5rem;
  margin: 1rem 0.4rem;
  padding: 0.75rem;

  p.label {
    color: ${props => props.theme.subHeading};
    font-size: 0.9rem;
    font-weight: ${props => props.theme.font.regular};
    margin-bottom: 0.25rem;
  }
  p.value {
    font-size: 1.2rem;
    font-weight: ${props => props.theme.font.bold};
  }
`;
const Icon = styled.span`
  align-self: center;
  box-shadow: ${props => props.theme.shadow};
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  color: #fff;
`;

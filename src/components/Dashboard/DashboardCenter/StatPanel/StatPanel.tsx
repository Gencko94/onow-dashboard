import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { RiFileList3Line } from 'react-icons/ri';
import { MdAttachMoney } from 'react-icons/md';
const StatPanel = () => {
  return (
    <Container>
      <StatItem>
        <UsersIcon>
          <AiOutlineUser size={22} />
        </UsersIcon>
        <StatItemDetails>
          <StatItemText>Users Online</StatItemText>
          <StatItemValue>2012</StatItemValue>
        </StatItemDetails>
      </StatItem>
      <hr />
      <StatItem>
        <OrdersIcon>
          <RiFileList3Line size={22} />
        </OrdersIcon>
        <StatItemDetails>
          <StatItemText>Total Orders</StatItemText>
          <StatItemValue>238</StatItemValue>
        </StatItemDetails>
      </StatItem>
      <hr />
      <StatItem>
        <RevenueIcon>
          <MdAttachMoney size={22} />
        </RevenueIcon>
        <StatItemDetails>
          <StatItemText>Revenue</StatItemText>
          <StatItemValue>$3598</StatItemValue>
        </StatItemDetails>
      </StatItem>
      <hr />
      <StatItem>
        <RevenueIcon>
          <MdAttachMoney size={22} />
        </RevenueIcon>
        <StatItemDetails>
          <StatItemText>Revenue</StatItemText>
          <StatItemValue>$3598</StatItemValue>
        </StatItemDetails>
      </StatItem>
    </Container>
  );
};

export default StatPanel;
const Container = styled.div`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 8px;
  background-color: ${props => props.theme.boxColor};
  padding: 0.75rem;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* flex-direction: column; */
`;
const StatItem = styled.div`
  padding: 0.5rem 0.25rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;
const UsersIcon = styled.span`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: #da312c;
  color: #fff;
`;
const OrdersIcon = styled.span`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: #2cda66;
  color: #fff;
`;
const RevenueIcon = styled.span`
  box-shadow: ${props => props.theme.shadow};
  border-radius: 7px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: #2c86da;
  color: #fff;
`;
const StatItemDetails = styled.div`
  margin: 0 0.5rem;
`;
const StatItemText = styled.h6`
  font-size: 0.8rem;
  color: ${props => props.theme.subHeading};
  font-weight: ${props => props.theme.font.semibold};
`;
const StatItemValue = styled.p`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.xbold};
`;

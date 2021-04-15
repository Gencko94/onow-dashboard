import styled from 'styled-components';
import CustomerProfileInfo from '../components/CustomerProfile/CustomerProfileInfo';
import CustomerProfileOrders from '../components/CustomerProfile/CustomerProfileOrders/CustomerProfileOrders';
import CustomerProfilePanel from '../components/CustomerProfile/CustomerProfilePanel/CustomerProfilePanel';

const CustomerProfile = () => {
  return (
    <Container>
      <CustomerProfilePanel />
      <hr />
      <CustomerProfileInfo />
      <hr />
      <CustomerProfileOrders />
    </Container>
  );
};

export default CustomerProfile;
const Container = styled.div`
  padding: 0.75rem;
`;

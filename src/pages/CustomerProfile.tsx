import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import CustomerProfileInfo from '../components/CustomerProfile/CustomerProfileInfo';
import CustomerProfileOrders from '../components/CustomerProfile/CustomerProfileOrders/CustomerProfileOrders';
import CustomerProfilePanel from '../components/CustomerProfile/CustomerProfilePanel/CustomerProfilePanel';
import { CUSTOMER } from '../interfaces/customers/customers';
import { getSingleCustomer } from '../utils/test-queries';

const CustomerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery<CUSTOMER>(
    ['customer', id],
    () => getSingleCustomer(parseInt(id)),
    {
      suspense: true,
    }
  );
  return (
    <Container>
      <CustomerProfilePanel />
      <hr />
      <CustomerProfileInfo data={data!} />
      <hr />
      <CustomerProfileOrders />
    </Container>
  );
};

export default CustomerProfile;
const Container = styled.div`
  padding: 0.75rem;
`;

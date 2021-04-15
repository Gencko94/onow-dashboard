import styled from 'styled-components';
import CustomerList from '../components/Customers/CustomerList/CustomerList';
import CustomersPanel from '../components/Customers/CustomersPanel/CustomersPanel';

const Customers = () => {
  return (
    <Container>
      <CustomersPanel />
      <CustomerList />
    </Container>
  );
};

export default Customers;
const Container = styled.div`
  padding: 0.75rem;
`;

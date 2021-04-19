import styled from 'styled-components';
import CouponsList from '../components/Coupons/CouponsList/CouponsList';
import CouponsPanel from '../components/Coupons/CouponsPanel/CouponsPanel';

const Coupons = () => {
  return (
    <Container>
      <CouponsPanel />
      <CouponsList />
    </Container>
  );
};

export default Coupons;
const Container = styled.div`
  padding: 0.75rem;
`;

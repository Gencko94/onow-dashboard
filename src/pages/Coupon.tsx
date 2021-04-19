import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import CouponInfo from '../components/Coupons/Coupon/CouponInfo';
import { COUPON } from '../interfaces/coupons/coupons';

const Coupon = () => {
  const methods = useForm<COUPON>();
  return (
    <Container>
      <FormProvider {...methods}>
        <CouponInfo />
      </FormProvider>
    </Container>
  );
};

export default Coupon;
const Container = styled.div`
  padding: 0.75rem;
`;

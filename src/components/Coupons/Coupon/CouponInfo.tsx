import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { COUPON } from '../../../interfaces/coupons/coupons';

const CouponInfo = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<COUPON>();
  return <Container>hg</Container>;
};

export default CouponInfo;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadow};
`;

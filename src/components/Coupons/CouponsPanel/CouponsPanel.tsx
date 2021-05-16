import { BiPlus } from "react-icons/bi";
import { useHistory } from "react-router";
import styled from "styled-components";
import AddButton from "../../reusable/AddButton";

const CouponsPanel = () => {
  const history = useHistory();
  return (
    <Container>
      <AddButton target="/coupons/create" title="Create new Coupon" />
    </Container>
  );
};

export default CouponsPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

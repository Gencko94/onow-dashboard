import { BiPlus } from 'react-icons/bi';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const CouponsPanel = () => {
  const history = useHistory();
  return (
    <Container>
      <button
        className="addBtn"
        onClick={() => history.push('/coupons/coupon')}
      >
        <span className="icon">
          <BiPlus size={30} />
        </span>
        <p>Add New Coupon</p>
      </button>
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
  .addBtn {
    background-color: ${props => props.theme.green};
    box-shadow: ${props => props.theme.shadow};
    border-radius: 7px;
    position: relative;
    padding: 0.25rem 0.5rem;
    color: #fff;
    display: flex;
    align-items: center;
    p {
      font-size: 0.9rem;
      font-weight: ${props => props.theme.font.regular};
      margin: 0 0.5rem;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

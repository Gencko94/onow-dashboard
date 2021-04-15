import styled from 'styled-components';
import { FiEye } from 'react-icons/fi';
const CustomerProfileOrderItem = () => {
  return (
    <Container>
      <div className="field">
        <button className="icon">
          <FiEye />
        </button>
      </div>
      <div className="field">
        <h6>#567892</h6>
      </div>
      <div className="field">
        <h6>2/2/2020</h6>
      </div>
      <div className="field">
        <h6>65 KD</h6>
      </div>
      <div className="field">
        <h6>Delivered</h6>
      </div>
    </Container>
  );
};

export default CustomerProfileOrderItem;
const Container = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  border-bottom: ${props => props.theme.border};
  &:hover {
    background-color: ${props => props.theme.highlightColor};
  }
  button.icon {
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 75ms ease;
    &:hover {
      background-color: #e6e6e6;
    }
  }
  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      font-weight: ${props => props.theme.font.bold};
    }
  }
`;

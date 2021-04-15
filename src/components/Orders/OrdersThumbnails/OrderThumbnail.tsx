import { AiOutlineUser } from 'react-icons/ai';
import styled from 'styled-components';

const OrderThumbnail = () => {
  return (
    <Container>
      <span className="icon">
        <AiOutlineUser size={22} />
      </span>
      <div>
        <p className="label">Users Online</p>
        <p className="value">2012</p>
      </div>
    </Container>
  );
};

export default OrderThumbnail;
const Container = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  gap: 0.5rem;
  margin: 1rem 0.4rem;
  padding: 0.75rem;
  /* min-width: 175px; */
  .icon {
    box-shadow: ${props => props.theme.shadow};
    border-radius: 7px;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    background-color: #da312c;
    color: #fff;
  }
  p.label {
    color: ${props => props.theme.subHeading};
    font-size: 0.8rem;
    margin-bottom: 0.4rem;
  }
  p.value {
    font-size: 0.8rem;
    font-weight: ${props => props.theme.font.bold};
  }
`;

import styled from 'styled-components';

const OrderDelivery = () => {
  return (
    <Container>
      <div className="title-container">
        <h6 className="title">Delivery Location </h6>
      </div>
      <div className="content">
        <div className="grid">
          <p className="label">City : </p>
          <p className="value">Hawalli</p>
        </div>
        <div className="grid">
          <p className="label">Address : </p>
          <p className="value">56St</p>
        </div>
        <div className="grid">
          <p className="label">Shipping Company </p>
          <p className="value">Absher</p>
        </div>
      </div>
    </Container>
  );
};

export default OrderDelivery;
const Container = styled.div`
  background: ${props => props.color};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 5px;

  .title-container {
    padding: 0.75rem;
    background-color: ${props => props.theme.overlayColor};
    border-bottom: ${props => props.theme.border};
  }
  .title {
    font-weight: ${props => props.theme.font.xbold};
  }
  .grid {
    padding: 0.5rem 0.5rem;
    display: grid;
    gap: 5px;
    grid-template-columns: auto 1fr;

    p.label {
      color: ${props => props.theme.subHeading};
      font-size: 0.9rem;
    }
    p.value {
      font-size: 0.9rem;
      font-weight: ${props => props.theme.font.semibold};
    }
  }
`;

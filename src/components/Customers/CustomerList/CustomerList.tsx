import styled from 'styled-components';
import CustomerItem from './CustomerItem/CustomerItem';

const CustomerList = () => {
  return (
    <Container>
      <GridHead>
        <div className="field">
          <span />
        </div>
        <div className="field">
          <h6>Customer Name</h6>
        </div>
        <div className="field">
          <h6>Customer Phone</h6>
        </div>
        <div className="field">
          <h6>Customer Email</h6>
        </div>
        <div className="field">
          <h6>Actions</h6>
        </div>
      </GridHead>
      <div>
        {[0, 1, 2, 3].map(i => (
          <CustomerItem />
        ))}
      </div>
    </Container>
  );
};

export default CustomerList;

const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${props => props.theme.border};
  box-shadow: ${props => props.theme.shadow};
`;

const GridContainer = styled.div``;

const GridHead = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 1fr 1fr 0.5fr;
  background-color: ${props => props.theme.overlayColor};
  border-bottom: ${props => props.theme.border};
  gap: 1rem;
  /* padding: 0 0.5rem; */
  .field {
    padding: 1rem;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      color: ${props => props.theme.subHeading};
      font-weight: ${props => props.theme.font.semibold};
    }
  }
`;

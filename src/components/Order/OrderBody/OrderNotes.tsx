import styled from "styled-components";

const OrderNotes = () => {
  return (
    <Container>
      <div className="title-container">
        <h5>Customer Notes</h5>
      </div>
      <div className="field">No Notes </div>
    </Container>
  );
};

export default OrderNotes;
const Container = styled.div`
  padding: 1rem;
  .title-container {
    padding: 1rem 0;

    h5 {
      font-size: 1rem;
    }
  }
  .field {
    background-color: ${(props) => props.theme.subtleBackground};
    padding: 0.5rem;
    font-size: 0.9rem;
    border: ${(props) => props.theme.border};
    border-radius: 6px;
  }
`;

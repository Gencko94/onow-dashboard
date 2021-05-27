import styled from "styled-components";
import AddButton from "../reusable/AddButton";

const BrandsPanel = () => {
  return (
    <Container>
      <AddButton target="/brands/create" title="Create new Brand" />
    </Container>
  );
};

export default BrandsPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

import styled from "styled-components";
import AddButton from "../reusable/AddButton";

const CategoriesPanel = () => {
  return (
    <Container>
      <AddButton target="/categories/create" title="Create new Category" />
    </Container>
  );
};

export default CategoriesPanel;
const Container = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

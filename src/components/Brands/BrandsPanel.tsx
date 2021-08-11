import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../reusable/Button";

const BrandsPanel = () => {
  const history = useHistory();
  return (
    <Container>
      <Button
        onClick={() => history.push("/brands/create")}
        withTransition
        size="md"
      >
        Create New Brand
      </Button>
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

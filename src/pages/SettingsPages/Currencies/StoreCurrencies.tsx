import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";

const StoreCurrencies = () => {
  return (
    <Container>
      <Breadcrumbs
        childLabel="Store Currencies"
        parentLabel="Settings"
        parentTarget="/settings"
      />
      <div className="title-container">
        <h5>Store Currencies</h5>
      </div>
    </Container>
  );
};

export default StoreCurrencies;
const Container = styled.div`
  .title-container {
    padding: 2rem 0;
    color: ${(props) => props.theme.mainColor};
  }
`;

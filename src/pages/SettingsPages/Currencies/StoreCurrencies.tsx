import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";

const StoreCurrencies = () => {
  return (
    <Container>
      <Breadcrumbs
        children={[
          {
            name: { ar: "الإعدادات", en: "Settings" },
            target: "/settings",
          },
          {
            name: { ar: "عملات المتجر", en: "Store Currencies" },
            target: "",
          },
        ]}
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
    margin: 1rem 0;
    color: ${(props) => props.theme.primary};
  }
`;

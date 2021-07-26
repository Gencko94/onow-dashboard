import styled from "styled-components";
import Heading from "../../StyledComponents/Heading";

import TrendingProduct from "./TrendingProduct";
import Grid from "../../StyledComponents/Grid";

const DashboardTrendingProducts = () => {
  return (
    <Container>
      <Heading tag="h5" weight="semibold" mb="2rem">
        Trending Products
      </Heading>
      <Grid cols="repeat(auto-fit,minmax(280px,1fr))" gap="0.75rem">
        {[0, 1, 2, 3].map((product) => (
          <TrendingProduct
            key={product}
            image="/images/burger.jpg"
            name="Cheese Burger"
            price="3.97"
            totalOrders="38"
          />
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardTrendingProducts;
const Container = styled.div`
  padding: 0.75rem;
  align-self: start;

  .items-container {
    padding: 0.75rem 0;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.25rem;
  }
`;

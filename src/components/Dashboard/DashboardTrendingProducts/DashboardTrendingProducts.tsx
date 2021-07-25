import styled from "styled-components";
import Heading from "../../StyledComponents/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import TrendingProduct from "./TrendingProduct";
import Grid from "../../StyledComponents/Grid";
SwiperCore.use([Navigation]);
const breakpoints = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1.25,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 2.25,
    spaceBetween: 20,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 4.25,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 15,
  },
};
const DashboardTrendingProducts = () => {
  return (
    <Container>
      <Heading tag="h5" weight="regular" mb="2rem">
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

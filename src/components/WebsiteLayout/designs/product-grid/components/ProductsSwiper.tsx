import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useFormContext } from 'react-hook-form';
import { PRODUCT_GRID_DESIGN } from '../../../../../interfaces/website-layout/designs/product-grid-design';
import GridProductDemo from './GridProductDemo';
SwiperCore.use([Navigation]);
const ProductsSwiper = () => {
  const { control, watch } = useFormContext<PRODUCT_GRID_DESIGN>();

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
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };
  return (
    <Container>
      <Swiper breakpoints={breakpoints} freeMode navigation>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <SwiperSlide key={i}>
            <GridProductDemo />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default ProductsSwiper;
const Container = styled.div``;

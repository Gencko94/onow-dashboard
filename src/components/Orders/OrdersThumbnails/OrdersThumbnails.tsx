import styled from 'styled-components';
import OrderThumbnail from './OrderThumbnail';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
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
    slidesPerView: 4,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 5,
    spaceBetween: 0,
  },
  1100: {
    slidesPerView: 6.5,
    spaceBetween: 0,
  },
  1440: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
};
const OrdersThumbnails = () => {
  return (
    <Container>
      <Swiper
        breakpoints={breakpoints}
        freeMode
        // navigation
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 54, 89, 54, 56].map(i => (
          <SwiperSlide key={i}>
            <OrderThumbnail />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default OrdersThumbnails;
const Container = styled.div`
  margin: 1rem 0;
`;

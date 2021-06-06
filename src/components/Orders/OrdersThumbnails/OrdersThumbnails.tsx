import styled from "styled-components";
import OrderThumbnail from "./OrderThumbnail";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import { STORE_ORDERS_STAT } from "../../../interfaces/orders/orders";
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
    spaceBetween: 20,
  },
};
interface IProps {
  stats: STORE_ORDERS_STAT[];
}
const OrdersThumbnails = ({ stats }: IProps) => {
  return (
    <Container>
      <Swiper breakpoints={breakpoints} freeMode>
        {stats.map((status) => (
          <SwiperSlide key={status.id}>
            <OrderThumbnail status={status} />
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

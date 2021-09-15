import styled from "styled-components";

import Heading from "../../components/StyledComponents/Heading";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Spacer from "../../components/reusable/Spacer";
import Flex from "../../components/StyledComponents/Flex";
import Paragraph from "../../components/StyledComponents/Paragraph";
import Hr from "../../components/StyledComponents/Hr";
import ReportsDatePicker from "../../components/ReportsDatePicker/ReportsDatePicker";

import { format, subDays } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperGrid from "../../components/SwiperGrid";

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
    slidesPerView: 5,
    spaceBetween: 20,
  },
};
type BESTSELLER_PRODUCT = {
  id: number;
  name: { [key: string]: string };
  total_sales: number;
  total_orders: number;
  quantity_sold: number;
  image: string;
};
const SalesReports = () => {
  const [dates, setDates] = useState<{ start: Date | null; end: Date | null }>({
    start: subDays(new Date(), 30),
    end: new Date(),
  });

  const {
    i18n: { language },
  } = useTranslation();
  const stats: BESTSELLER_PRODUCT[] = useMemo(() => {
    return [
      {
        id: 1,
        name: { ar: "منتج 1", en: "Product 1" },
        total_sales: 50,
        total_orders: 20,
        quantity_sold: 21,
        image: "/images/mushroom.jpg",
      },
      {
        id: 2,
        name: { ar: "منتج 2", en: "Product 2" },
        total_sales: 50,
        total_orders: 20,
        quantity_sold: 21,
        image: "/images/mushroom.jpg",
      },
      {
        id: 3,
        name: { ar: "منتج 3", en: "Product 3" },
        total_sales: 50,
        total_orders: 20,
        quantity_sold: 21,
        image: "/images/mushroom.jpg",
      },
    ];
  }, []);
  return (
    <Container>
      <Flex items="center" justify="flex-end">
        <ReportsDatePicker dates={dates} setDates={setDates} />
      </Flex>
      <Heading type="medium-title" tag="h5">
        Best Selling Products
      </Heading>
      <Spacer size={40} />
      <SwiperGrid>
        <Swiper breakpoints={breakpoints} freeMode>
          {stats.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard>
                <div className="img-container">
                  <img src={product.image} alt={product.name.en} />
                </div>
                <div className="content">
                  <Heading type="small-title" tag="h5">
                    {product.name[language]}
                  </Heading>
                  <Hr m="0.2rem" />
                  <Flex>
                    <Paragraph fontSize="0.9rem" color="textAlt">
                      Total Sales :
                    </Paragraph>
                    <Spacer size={10} />
                    <Paragraph fontSize="0.9rem" weight="semibold">
                      {product.total_sales} KD
                    </Paragraph>
                  </Flex>
                  <Flex>
                    <Paragraph fontSize="0.9rem" color="textAlt">
                      Total Orders :
                    </Paragraph>
                    <Spacer size={10} />
                    <Paragraph fontSize="0.9rem" weight="semibold">
                      {product.total_orders}
                    </Paragraph>
                  </Flex>
                  <Flex>
                    <Paragraph fontSize="0.9rem" color="textAlt">
                      Quantity Sold
                    </Paragraph>
                    <Spacer size={10} />
                    <Paragraph fontSize="0.9rem" weight="semibold">
                      {product.quantity_sold}
                    </Paragraph>
                  </Flex>
                </div>
              </ProductCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperGrid>
    </Container>
  );
};

export default SalesReports;
const Container = styled.div``;
const ProductCard = styled.div`
  background-color: ${(props) => props.theme.subtleFloating};
  border-radius: 6px;
  overflow: hidden;
  .img-container {
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: auto;
    }
  }
  .content {
    padding: 0.75rem;
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    .img-container {
      height: 175px;
    }
  }
`;

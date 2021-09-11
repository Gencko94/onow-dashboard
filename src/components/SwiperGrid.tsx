import styled from "styled-components";

const SwiperGrid: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SwiperGrid;
const Container = styled.div`
  display: grid;

  .swiper-container {
    width: 100%;
  }
`;

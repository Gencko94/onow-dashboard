import { useTranslation } from "react-i18next";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";
import styled from "styled-components";

const ScrollToTop = () => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <AiOutlineVerticalAlignTop />
    </Container>
  );
};

export default ScrollToTop;
const Container = styled.button(
  ({ theme: { breakpoints, shadow } }) => `
    position: fixed;
    z-index:9;
    bottom: 50px;
    right: 50px;
    background-color:#fff;
    padding:1rem;
    border-radius:50%;
    width:50px;
    height:50px;
    box-shadow:${shadow};
    `
);

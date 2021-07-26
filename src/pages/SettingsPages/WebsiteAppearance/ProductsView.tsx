import { Controller, useForm } from "react-hook-form";

import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../../components/reusable/HeaderContainer";
import Checkbox from "../../../components/reusable/Inputs/Checkbox";

import Flex from "../../../components/StyledComponents/Flex";
import Zoom from "react-medium-image-zoom";
import Grid from "../../../components/StyledComponents/Grid";
import Heading from "../../../components/StyledComponents/Heading";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import "react-medium-image-zoom/dist/styles.css";
import RadioButton from "../../../components/reusable/RadioButton";
import { FcOk } from "react-icons/fc";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

const ProductsView = () => {
  const { control } = useForm();

  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

  return (
    <Container>
      <HeaderContainer>
        <Breadcrumbs
          children={[
            {
              name: { ar: "الإعدادات", en: "Settings" },
              target: "/settings",
            },
            {
              name: { ar: "مظهر الموقع", en: "Website Appearance" },
              target: "/settings/website-appearance",
            },
            {
              name: { ar: "مظهر المنتجات", en: "Products View" },
              target: "",
            },
          ]}
        />
      </HeaderContainer>
      <Heading
        tag="h5"
        margin="2rem 0 1rem 0"
        weight="semibold"
        color="primary"
      >
        Products View in Home Page
      </Heading>
      <div className="desc">
        <Heading tag="h6" color="subheading">
          You can Control how your products look in your website's Home Page
        </Heading>
      </div>

      <Grid gap="1rem" cols="repeat(auto-fit,minmax(275px,1fr))">
        <Card>
          <div className="img-wrapper">
            <Zoom>
              <img src="/images/grid-demo.jpg" alt="" />
            </Zoom>
          </div>
          <Flex justify="center" padding=" 0.5rem" items="center">
            <Heading
              tag="h6"
              color="heading"
              weight="semibold"
              margin="0 0.5rem"
            >
              Grid View
            </Heading>
            {/* <Checkbox checked={true} onChange={() => {}} /> */}
            <FcOk size={30} />
          </Flex>
        </Card>
        <Card>
          <div className="img-wrapper">
            <Zoom>
              <img src="/images/list-demo.jpg" alt="bar demo" />
            </Zoom>
          </div>
          <Flex justify="center" padding=" 0.5rem" items="center">
            <Heading
              tag="h6"
              margin="0 0.5rem"
              weight="semibold"
              color="subheading"
            >
              List View
            </Heading>

            <RiCheckboxBlankCircleLine
              style={{ cursor: "pointer" }}
              onClick={() => {}}
              size={30}
            />
          </Flex>
        </Card>
        <Card>
          <div className="img-wrapper">
            <Zoom>
              <img src="/images/bar-demo.jpg" alt="" />
            </Zoom>
          </div>
          <Flex justify="center" padding=" 0.5rem">
            <Heading
              tag="h6"
              margin="0 0.5rem"
              weight="semibold"
              color="subheading"
            >
              Bar View
            </Heading>
            <RiCheckboxBlankCircleLine size={30} />
          </Flex>
        </Card>
      </Grid>
    </Container>
  );
};

export default ProductsView;
const Container = styled.div`
  .desc {
    padding: 0.5rem;
    background-color: ${(props) => props.theme.accent3};
    border-radius: 6px;
    border: ${(props) => props.theme.border};
    margin: 1rem 0;
  }
`;
const Card = styled.div`
  border-radius: 6px;

  background-color: ${(props) => props.theme.accent1};
  border: ${(props) => props.theme.border};
  /* padding: 0.5rem; */
  .img-wrapper {
    height: 400px;
    width: 100%;
    /* border-radius: 6px; */
    border-bottom: ${(props) => props.theme.border};
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      object-position: top;
      /* max-height: 100%; */
      /* height: 100%; */
    }
  }
`;
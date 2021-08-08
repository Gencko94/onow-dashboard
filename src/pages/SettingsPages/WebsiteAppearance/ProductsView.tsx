import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";

import Flex from "../../../components/StyledComponents/Flex";
import Zoom from "react-medium-image-zoom";
import Grid from "../../../components/StyledComponents/Grid";
import Heading from "../../../components/StyledComponents/Heading";

import "react-medium-image-zoom/dist/styles.css";

import { FcOk } from "react-icons/fc";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import useToast from "../../../hooks/useToast";
import {
  editStoreProductsView,
  getStoreLayoutSettings,
} from "../../../utils/queries/settingsQueries";
import Button from "../../../components/reusable/Button";
import { useState } from "react";

const ProductsView = () => {
  const { handleCloseToast, setToastStatus } = useToast();
  const { data } = useQuery("store-layout", getStoreLayoutSettings, {
    suspense: true,
  });
  const [view, setView] = useState<"grid" | "list" | "bar">(() => {
    return data!.products_view;
  });
  const { mutateAsync: updateMutation, isLoading } = useMutation(
    editStoreProductsView
  );
  const handleChangeView = async (type: "grid" | "list" | "bar") => {
    await updateMutation(type);
    setToastStatus?.({
      fn: handleCloseToast!,
      type: "success",
      open: true,
      text: "Theme Color Changed Successfully",
    });
  };
  return (
    <Container>
      <Flex margin="1rem 0">
        <div>
          <Heading tag="h2" color="heading" mb="0.5rem" weight="bold">
            Products View
          </Heading>
          <Breadcrumbs
            withoutTitle
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
        </div>
      </Flex>

      <Heading tag="h5" margin="2rem 0 1rem 0" weight="bold" color="heading">
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
            {view === "grid" ? (
              <FcOk
                size={30}
                // style={{ cursor: "pointer" }}
              />
            ) : (
              <RiCheckboxBlankCircleLine
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setView("grid");
                }}
                size={30}
              />
            )}
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

            {view === "list" ? (
              <FcOk
                size={30}
                // style={{ cursor: "pointer" }}
              />
            ) : (
              <RiCheckboxBlankCircleLine
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setView("list");
                }}
                size={30}
              />
            )}
          </Flex>
        </Card>
        <Card>
          <div className="img-wrapper">
            <Zoom>
              <img src="/images/bar-demo.jpg" alt="" />
            </Zoom>
          </div>
          <Flex justify="center" padding=" 0.5rem" items="center">
            <Heading
              tag="h6"
              margin="0 0.5rem"
              weight="semibold"
              color="subheading"
            >
              Bar View
            </Heading>
            {view === "bar" ? (
              <FcOk
                size={30}
                // style={{ cursor: "pointer" }}
              />
            ) : (
              <RiCheckboxBlankCircleLine
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setView("bar");
                }}
                size={30}
              />
            )}
          </Flex>
        </Card>
      </Grid>
      <Flex margin="1rem 0" justify="center">
        <Button
          color="green"
          onClick={() => handleChangeView(view)}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </Flex>
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

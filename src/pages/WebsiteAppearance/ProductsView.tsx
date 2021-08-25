import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import Flex from "../../components/StyledComponents/Flex";
import Zoom from "react-medium-image-zoom";
import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import Tooltip from "@reach/tooltip";

import "react-medium-image-zoom/dist/styles.css";

import { FcOk } from "react-icons/fc";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import useToast from "../../hooks/useToast";
import {
  editStoreProductsView,
  getStoreLayoutSettings,
} from "../../utils/queries/settingsQueries";
import Button from "../../components/reusable/Button";
import { useMemo, useState } from "react";
import Box from "../../components/reusable/Box/Box";
import Spacer from "../../components/reusable/Spacer";
import Paragraph from "../../components/StyledComponents/Paragraph";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
type OPTIONS = {
  title: {
    [key: string]: string;
  };
  image: string;
  key: "grid" | "list" | "bar";
}[];
const ProductsView = () => {
  const { handleCloseToast, setToastStatus } = useToast();
  const { data } = useQuery("store-layout", getStoreLayoutSettings, {
    suspense: true,
  });
  const {
    i18n: { language },
  } = useTranslation();
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

  const options: OPTIONS = useMemo(() => {
    return [
      {
        title: {
          ar: "جدول",
          en: "Grid View",
        },
        key: "grid",
        image: "/images/grid-demo.jpg",
      },
      {
        title: {
          ar: "قائمة",
          en: "List View",
        },
        key: "list",
        image: "/images/list-demo.jpg",
      },
      {
        title: {
          ar: "اختيار",
          en: "Bar View",
        },
        key: "bar",
        image: "/images/bar-demo.jpg",
      },
    ];
  }, []);
  return (
    <div>
      <Flex margin="1rem 0">
        <div>
          <Heading tag="h2" type="large-title">
            Products View
          </Heading>
          <Breadcrumbs
            withoutTitle
            children={[
              {
                name: { ar: "مظهر الموقع", en: "Theme & Appearance" },
                target: "/website-appearance/theme-appearance",
              },
              {
                name: { ar: "مظهر المنتجات", en: "Products View" },
                target: "",
              },
            ]}
          />
        </div>
      </Flex>
      <Spacer size={40} />
      <Box type="titled" boxTitle="Products View in Home Page">
        <Tooltip label="Save">
          <button>
            <FaRegQuestionCircle />
          </button>
        </Tooltip>
        <Paragraph color="textAlt">
          You can Control how your products look in your website's Home Page
        </Paragraph>

        <Grid gap="1rem" cols="repeat(auto-fit,minmax(275px,1fr))">
          {options.map((option) => {
            return (
              <Card>
                <div className="img-wrapper">
                  <Zoom>
                    <img src="/images/grid-demo.jpg" alt="" />
                  </Zoom>
                </div>
                <Flex justify="center" padding=" 0.5rem" items="center">
                  <Heading tag="h6" type="small-title">
                    {option.title[language]}
                  </Heading>
                  <Spacer size={10} />
                  {view === option.key ? (
                    <FcOk size={20} />
                  ) : (
                    <RiCheckboxBlankCircleLine
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setView(option.key);
                      }}
                      size={20}
                    />
                  )}
                </Flex>
              </Card>
            );
          })}
        </Grid>
      </Box>
      <Spacer size={40} />
      <Flex margin="1rem 0" justify="center">
        <Button
          color="green"
          onClick={() => handleChangeView(view)}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </Flex>
    </div>
  );
};

export default ProductsView;

const Card = styled.div`
  border-radius: 6px;

  background-color: ${(props) => props.theme.subtleBackground};

  border: ${(props) => props.theme.border};
  /* padding: 0.5rem; */
  .img-wrapper {
    /* height: 400px; */
    width: 100%;
    border-radius: 6px;
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

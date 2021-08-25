import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import Grid from "../../components/StyledComponents/Grid";
import Heading from "../../components/StyledComponents/Heading";
import Paragraph from "../../components/StyledComponents/Paragraph";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useMutation, useQuery } from "react-query";
import {
  editStoreThemeColor,
  getStoreLayoutSettings,
} from "../../utils/queries/settingsQueries";
import useToast from "../../hooks/useToast";
import Flex from "../../components/StyledComponents/Flex";
import Button from "../../components/reusable/Button";
import { up } from "../../utils/themes";
import Spacer from "../../components/reusable/Spacer";
import Box from "../../components/reusable/Box/Box";

const HomePageAppearance = () => {
  const { data } = useQuery("store-layout", getStoreLayoutSettings, {
    suspense: true,
  });
  const { handleCloseToast, setToastStatus } = useToast();
  const history = useHistory();
  const [color, setColor] = useColor("hex", data!.store_theme_color);
  const [colorOpen, setColorOpen] = useState(false);
  const { mutateAsync: updateMutation, isLoading } =
    useMutation(editStoreThemeColor);
  const handleChangeColor = async (color: string) => {
    await updateMutation(color);
    setToastStatus?.({
      fn: handleCloseToast!,
      type: "success",
      open: true,
      text: "Theme Color Changed Successfully",
    });
  };
  return (
    <div>
      <Heading tag="h5" type="large-title">
        Theme & Appearance / Website Appearance
      </Heading>
      {/* <Breadcrumbs
        withoutTitle
        children={[
          {
            name: { ar: "مظهر الموقع", en: "Website Appearance" },
            target: "",
          },
        ]}
      /> */}
      <Spacer size={40} />
      <Box type="titled" boxTitle="Website Main Color">
        <Grid
          items="center"
          cols="repeat(auto-fit,minmax(300px,1fr))"
          gap="1rem"
        >
          <div>
            <Heading tag="h6" type="small-title">
              Select Your Store Primary Color:
            </Heading>
            <Paragraph color="textAlt" fontSize="0.8rem">
              We Recommend picking dark colors.
            </Paragraph>
          </div>

          <PickerOverview
            color={color.hex}
            onClick={() => {
              setColorOpen(true);
            }}
          >
            <button
              onClick={() => {
                setColorOpen(true);
              }}
              style={{ width: "100%" }}
            ></button>
            <CSSTransition
              in={colorOpen}
              classNames="menu"
              timeout={300}
              unmountOnExit
            >
              <ClickAwayListener onClickAway={() => setColorOpen(false)}>
                <div className="picker">
                  <ColorPicker
                    width={250}
                    height={100}
                    color={color}
                    onChange={setColor}
                    hideHSV
                    hideRGB
                    dark
                  />
                </div>
              </ClickAwayListener>
            </CSSTransition>
          </PickerOverview>
        </Grid>
      </Box>
      <Flex margin="1rem 0" justify="center">
        <Button
          color="green"
          onClick={() => handleChangeColor(color.hex)}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </Flex>
      <Box type="titled" boxTitle="Website Sections customization">
        <Grid
          cols="repeat(auto-fill,minmax(300px,1fr))"
          gap="2rem"
          margin="1rem 0"
          p={4}
        >
          <Card
            onClick={() => {
              history.push("/website-appearance/header-type");
            }}
          >
            <div className="img-wrapper">
              <img src="/images/carousel-demo.png" alt="carousel-demo" />
            </div>
            <Heading tag="h5" type="small-title">
              Header Type
            </Heading>
            <Paragraph fontSize="0.9rem" color="textAlt">
              Select your preffered header type
            </Paragraph>
          </Card>
          <Card
            onClick={() => {
              history.push("/website-appearance/products-view");
            }}
          >
            <div className="img-wrapper">
              <img src="/images/bar-demo.jpg" alt="bar-demo" />
            </div>
            <Heading tag="h5" type="small-title">
              Products View
            </Heading>
            <Paragraph fontSize="0.9rem" color="textAlt">
              Manage how your products look
            </Paragraph>
          </Card>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePageAppearance;
const PickerOverview = styled.div<{ color?: string }>(
  ({ theme: { breakpoints, border, accent1 }, color }) => `

    width: 100%;
    border: ${border};
    background-color: ${color};
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;

  .picker {
    z-index: 1;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
  
`
);
const Card = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: ${(props) => props.theme.subtleBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  padding: 1rem;
  transition: all 150ms ease;
  .img-wrapper {
    min-height: 200px;

    max-height: 200px;
    margin-bottom: 1rem;
    /* border: ${(props) => props.theme.border}; */
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      object-position: top;
      max-height: 100%;
    }
  }

  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
    transform: translateY(-2px);
  }
`;

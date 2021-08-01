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
import { useMutation } from "react-query";
import { editStoreThemeColor } from "../../utils/queries/settingsQueries";
import useToast from "../../hooks/useToast";
import Flex from "../../components/StyledComponents/Flex";
import Button from "../../components/reusable/Button";
import { up } from "../../utils/themes";

const HomePageAppearance = () => {
  const { handleCloseToast, setToastStatus } = useToast();
  const history = useHistory();
  const [color, setColor] = useColor("hex", "#ce2d2d");
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
      <Flex margin="1rem 0">
        <div>
          <Heading tag="h3" color="heading" mb="0.5rem" weight="bold">
            Website Appearance
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
                target: "",
              },
            ]}
          />
        </div>
      </Flex>
      <Box color={color.hex}>
        <div className="head">
          <Heading tag="h5" color="heading" weight="bold">
            Website Main Color
          </Heading>
        </div>
        <div className="content">
          <div>
            <Heading tag="h6" color="primary" weight="semibold">
              Select Your Store Primary Color:
            </Heading>
            <Paragraph color="textSecondary" fontSize="0.9rem">
              We Recommend picking dark colors.
            </Paragraph>
          </div>
          <div
            onClick={() => {
              setColorOpen(true);
            }}
            className="color"
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
          </div>
        </div>
      </Box>
      <Flex margin="1rem 0" justify="center">
        <Button
          bg="green"
          padding="0.5rem"
          onClick={() => handleChangeColor(color.hex)}
          isLoading={isLoading}
        >
          Save Changes
        </Button>
      </Flex>
      <Box>
        <div className="head">
          <Heading tag="h5" color="heading" weight="bold">
            Website Sections customization
          </Heading>
        </div>
        <Grid
          cols="repeat(auto-fill,minmax(300px,1fr))"
          gap="2rem"
          margin="1rem 0"
          p={4}
        >
          <Card
            onClick={() => {
              history.push("/settings/website-appearance/store-carousel");
            }}
          >
            <div className="img-wrapper">
              <img src="/images/carousel-demo.png" alt="carousel-demo" />
            </div>
            <Heading tag="h5" color="primary" mb="0.25rem" weight="semibold">
              Store Carousel
            </Heading>
            <p className="desc">Edit Images in Store Carousel</p>
          </Card>
          <Card
            onClick={() => {
              history.push("/settings/website-appearance/products-view");
            }}
          >
            <div className="img-wrapper">
              <img src="/images/bar-demo.jpg" alt="bar-demo" />
            </div>
            <Heading tag="h5" color="primary" mb="0.25rem" weight="semibold">
              Products View
            </Heading>
            <p className="desc">Manage how your products look</p>
          </Card>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePageAppearance;
const Box = styled.div<{ color?: string }>(
  ({ theme: { breakpoints, border, accent1 }, color }) => `
  border: ${border};
  background-color: ${accent1};
  border-radius: 6px;
  .head {
    border-bottom: ${border};
    padding: 0.5rem ;
  }
  .content {
    padding: 0.5rem;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    gap:1rem;
    align-items:center;

  }
  .color {
    width: 100%;
    border: ${border};
    background-color: ${color};
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  }
  .picker {
    z-index: 1;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
  ${up(breakpoints.md)}{
    .head , .content {

      padding:1rem;
    }
  }
`
);
const Card = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  background-color: #fff;
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
  p.desc {
    font-size: 0.8rem;
    color: ${(props) => props.theme.textSecondary};
    font-weight: ${(props) => props.theme.font.regular};
    text-align: center;
  }
  &:hover {
    box-shadow: ${(props) => props.theme.shadow};
    transform: translateY(-2px);
  }
`;

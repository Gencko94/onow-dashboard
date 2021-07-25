import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";
import Breadcrumbs from "../../../components/reusable/Breadcrumbs";
import HeaderContainer from "../../../components/reusable/HeaderContainer";

import Grid from "../../../components/StyledComponents/Grid";
import Heading from "../../../components/StyledComponents/Heading";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import FileUploader from "../../../utils/FileUploader";

const StoreCarousel = () => {
  const { control } = useForm();
  const [images, setImages] = useState<File[]>([]);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

  const onRemove = async (image: File) => {
    handleCloseConfirmationModal?.();
  };

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
              name: { ar: "معرض الصور", en: "Store Carousel" },
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
        Store Main Carousel Images
      </Heading>
      <div className="desc">
        <Heading tag="h6" color="subheading" mb="0.5rem">
          Carousel Images are images that are shown in your website home page.
          If Multiple images were uploaded Then it will turn into a slider.
        </Heading>
        <Heading tag="h6" color="subheading">
          Recommended Width To Height Ratio : (1 : 1.25).
        </Heading>
      </div>
      <PreviewContainer>
        <Grid cols="repeat(auto-fill,minmax(400px,1fr))" gap="1rem">
          {images.map((image, index) => {
            return (
              <div className="img-preview">
                <img src={URL.createObjectURL(image)} alt={`i-${index}`} />

                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    setConfirmationModalStatus?.({
                      closeCb: handleCloseConfirmationModal!,
                      desc: "Are you sure you want to remove this image ?",
                      title: "Remove Image",
                      open: true,
                      successCb: () => onRemove(image),
                    });
                  }}
                >
                  <IoMdCloseCircle size={35} />
                </button>
              </div>
            );
          })}
        </Grid>
      </PreviewContainer>
      <Box>
        <Controller
          control={control}
          name="images"
          render={({ field: { onChange, value, ref } }) => (
            <FileUploader
              accept=".png, .jpg, .jpeg"
              onChange={(file: File | File[]) => {
                if (!Array.isArray(file)) {
                  setImages((prev) => [...prev, file]);
                }
              }}
            />
          )}
        />
      </Box>
    </Container>
  );
};

export default StoreCarousel;
const Container = styled.div`
  .desc {
    padding: 0.5rem;
    background-color: ${(props) => props.theme.accent3};
    border-radius: 6px;
    border: ${(props) => props.theme.border};
    margin: 1rem 0;
  }
`;
const Box = styled.div`
  background-color: ${(props) => props.theme.bodyColor};
  border-radius: 6px;
`;
const PreviewContainer = styled.div(
  ({ theme: { breakpoints, accentColor, green, dangerRed, border } }) => `
    padding:1rem;
    .img-preview {
      position:relative;
      border-radius:6px;
      border:${border};
      img {
        width:100%;
        object-fit:contain;
        max-height:200px;
        min-height:200px;
        object-position:center;
        border-bottom:${border};
      }
      .default-container {
        p {
          font-size:0.9rem;
        }
        span {
          margin: 0 0.25rem;
          color:${green};
          display:flex;
          align-items:center;
        }
      }
      .remove {
        position: absolute;
        top: -10px;
        right: -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${dangerRed};
      }
    }
    `
);

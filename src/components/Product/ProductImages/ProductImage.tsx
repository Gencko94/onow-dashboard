import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import styled from "styled-components";
import { up } from "../../../constants";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import { ADD_PRODUCT_IMAGE } from "../../../interfaces/products/update-product";
import extractError from "../../../utils/extractError";
import MiniFileUploader from "../../../utils/MiniFileUploader";
import { customerUri } from "../../../utils/queries";
import Box from "../../reusable/Box/Box";
import ProductImageGallery from "./ProductImageGallery";

interface IProps {
  data: PRODUCT;
}

const ProductImage = ({ data }: IProps) => {
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const [progress, setProgress] = useState<number | null>(null);

  // Adding a Product Default Image
  const { control } = useForm<ADD_PRODUCT_IMAGE>({
    defaultValues: { image: data.image },
  });

  // Update Logic
  const updateImage = async (
    image: File,
    progressFn: (progress: number) => void
  ) => {
    try {
      const t = localStorage.getItem("dshtid");
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: t ? `Bearer ${t}` : "",
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          progressFn(percentCompleted);
        },
      };
      const formData = new FormData();
      formData.append("thumbnail", image);
      // formData.append("_method", "PUT");
      await axios.post(
        `${customerUri}/products/${data.id}/update-product-image`,
        formData,
        config
      );
      setProgress(null);

      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Image Updated Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();
      setProgress(null);
      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };

  return (
    <Container>
      <ProductImageGallery data={data} />
      <Box
        style={{ alignSelf: "self-start" }}
        type="titled"
        boxTitle="Default Product image"
      >
        <Controller
          control={control}
          name="image"
          render={({ field: { value } }) => {
            return (
              <MiniFileUploader
                accept=".png, .jpg, .jpeg"
                image={value}
                onChange={async (image) => {
                  await updateImage(image, setProgress);
                }}
                progress={progress}
              />
            );
          }}
        />
      </Box>

      {/* <ErrorMessage>{errors?.images && "Required"}</ErrorMessage> */}
    </Container>
  );
};

export default ProductImage;
const Container = styled.div(
  ({ theme: { breakpoints, shadow } }) => `
  display:grid;
  grid-template-columns:1fr;
  gap:1rem;
  ${up(breakpoints.md)}{
    grid-template-columns:1fr 1fr;

  }
  `
);

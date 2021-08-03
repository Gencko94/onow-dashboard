import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import { ADD_PRODUCT_IMAGE } from "../../../interfaces/products/update-product";
import extractError from "../../../utils/extractError";
import FileUploader from "../../../utils/FileUploader";
import MiniFileUploader from "../../../utils/MiniFileUploader";
import { customerUri } from "../../../utils/queries";
import {
  addProductImage,
  removeProductImage,
} from "../../../utils/queries/productQueries";
import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
import Hr from "../../StyledComponents/Hr";

interface IProps {
  data: PRODUCT;
}

const ProductImage = ({ data }: IProps) => {
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const [progress, setProgress] = useState<number | null>(null);
  const {
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ADD_PRODUCT_IMAGE>({
    defaultValues: { images: [], image: data.image },
  });
  const { mutateAsync: deleteMutation, reset } =
    useMutation(removeProductImage);
  const { mutateAsync: addImageMutation, reset: resetAdd } =
    useMutation(addProductImage);
  const image = watch("image");
  const images = watch("images");

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
      await axios.put(
        `${customerUri}/products/${data.id}/update-product-image`,
        formData,
        config
      );
      setProgress(null);
      // setValue("image", image);
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
  const removeImage = async (imageId: number) => {
    try {
      handleCloseConfirmationModal?.();
      await deleteMutation(imageId);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Image Removed Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const handleAddImage = async (file: File) => {
    try {
      handleCloseConfirmationModal?.();
      const res = await addImageMutation({ productId: data.id, image: file });
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Image Added Successfully",
        type: "success",
      });
      console.log(res);
      setValue("images", [...images, res]);
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            resetAdd();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            resetAdd();
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
      <Heading tag="h5" margin="1rem 0" weight="semibold" color="primary">
        Product Imaging
      </Heading>
      <DescriptionBox>
        <p>
          High Quality product images are very important when you're offering
          food, Truly delectable images will help your products sell themselfs.
        </p>
      </DescriptionBox>

      <Box>
        <Heading
          tag="h5"
          textAlign="center"
          margin="1rem 0"
          weight="semibold"
          color="heading"
        >
          Product Default Image
        </Heading>
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
      <Hr />
      <PreviewContainer>
        <Grid cols="repeat(auto-fill,minmax(200px,1fr))" gap="1rem">
          {data.images.map((image, index) => {
            return (
              <div className="img-preview">
                <img src={image?.link} alt={`i-${index}`} />

                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    setConfirmationModalStatus?.({
                      open: true,
                      desc: "Are you sure you want to delete this Image ?",
                      title: "Delete Image",
                      closeCb: handleCloseConfirmationModal!,
                      successCb: () => {
                        removeImage(image?.id);
                      },
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
        <Heading
          tag="h5"
          textAlign="center"
          margin="1rem 0"
          weight="semibold"
          color="heading"
        >
          Product Image Gallery
        </Heading>
        <Controller
          control={control}
          name="images"
          render={({ field: { onChange, value, ref } }) => (
            <FileUploader
              accept=".png, .jpg, .jpeg"
              onChange={(file: File | File[]) => {
                if (!Array.isArray(file)) {
                  handleAddImage(file);
                }
              }}
            />
          )}
        />
      </Box>

      <ErrorMessage>{errors?.images && "Required"}</ErrorMessage>
    </Container>
  );
};

export default ProductImage;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
 
  display:flex;
  flex-direction:column;
  
  .box {
    flex:1;
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media ${breakpoints.md} {
    .box {
      grid-template-columns: 1fr 1fr ;

    }
  }
  `
);
const DescriptionBox = styled.div`
  margin-bottom: 0.5rem;
  background-color: #ffe3d6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${(props) => props.theme.dangerRed};
`;
const Box = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  padding:1rem;
  .title {
    margin-bottom:1rem;
    text-align:center;
  }
  `
);
const PreviewContainer = styled.div(
  ({ theme: { breakpoints, accentColor, green, dangerRed, border } }) => `
  padding:1rem;
  .img-preview {
    position:relative;
    border-radius:6px;
    border:${border};
    img {
      width:100%;
      object-fit:cover;
      max-height:200px;
      min-height:200px;
      object-position:top;
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

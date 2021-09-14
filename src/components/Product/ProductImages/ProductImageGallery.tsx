import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Controller, useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import { ADD_PRODUCT_IMAGE } from "../../../interfaces/products/update-product";
import extractError from "../../../utils/extractError";
import FileUploader from "../../../utils/FileUploader";
import { customerUri } from "../../../utils/queries";
import { removeProductImage } from "../../../utils/queries/productQueries";
import Box from "../../reusable/Box/Box";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Spacer from "../../reusable/Spacer";
import SwiperGrid from "../../SwiperGrid";

const breakpoints = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1.75,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 2.25,
    spaceBetween: 20,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 2.5,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2.75,
    spaceBetween: 20,
  },
  1100: {
    slidesPerView: 3.25,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 3.5,
    spaceBetween: 20,
  },
};
interface IProps {
  data: PRODUCT;
}
const ProductImageGallery = ({ data }: IProps) => {
  const [loadingImage, setLoadingImage] = useState<File | null>(null);

  const {
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ADD_PRODUCT_IMAGE>({
    defaultValues: { images: [] },
  });
  const queryClient = useQueryClient();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const [galleryProgress, setGalleryProgress] = useState<number | null>(null);
  const images = watch("images");
  // Removing an Image from Gallery
  const { mutateAsync: deleteMutation, reset } = useMutation(
    removeProductImage,
    {
      onSuccess: (_, oldId) => {
        queryClient.setQueryData<PRODUCT | undefined>(
          ["product", data.id],
          (prev) => {
            if (prev) {
              return {
                ...prev,
                images: prev.images.filter((imageObj) => imageObj.id !== oldId),
              };
            }
          }
        );
      },
    }
  );
  // Remove logic
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
  //  Add Logic
  const handleAddImage = async (file: File) => {
    try {
      handleCloseConfirmationModal?.();
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

          setGalleryProgress(percentCompleted);
        },
      };
      const formData = new FormData();
      formData.append("product_id", data.id as any);
      formData.append("image", file);
      const res = await axios.post(
        `${customerUri}/product-images`,
        formData,
        config
      );

      setGalleryProgress(null);

      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Image Added Successfully",
        type: "success",
      });
      console.log(res.data);
      setValue("images", [res.data.results, ...images]);
      // Update the product cache
      queryClient.setQueryData<PRODUCT | undefined>(
        ["product", data.id],
        (prev) => {
          console.log(prev);
          console.log(data.id);
          if (prev) {
            return {
              ...prev,
              images: [{ ...res.data.results }, ...prev.images],
            };
          }
        }
      );
    } catch (error) {
      handleCloseConfirmationModal?.();

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
    <Box type="titled" boxTitle="Image Gallery">
      {/* Added Swiper Grid for The breakpoints bug */}
      <SwiperGrid>
        <Swiper breakpoints={breakpoints}>
          {galleryProgress !== null && (
            <SwiperSlide>
              <ImagePreview>
                <img
                  className="loading-image"
                  src={URL.createObjectURL(loadingImage)}
                  alt={`Uploading...`}
                />
                <div className="progress-container">
                  <CircularProgressbar
                    strokeWidth={2}
                    value={galleryProgress}
                    maxValue={100}
                    styles={buildStyles({
                      pathColor: "#f78f21",
                      textSize: "0.7rem",
                      textColor: "#f78f21",
                    })}
                    text={`${galleryProgress}% Uploaded`}
                  />
                </div>
              </ImagePreview>
            </SwiperSlide>
          )}
          {data.images.map((image, index) => {
            return (
              <SwiperSlide>
                <ImagePreview>
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
                </ImagePreview>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </SwiperGrid>
      <Spacer size={40} />
      <Controller
        control={control}
        name="images"
        render={({ field: { onChange, value, ref } }) => (
          <FileUploader
            accept=".png, .jpg, .jpeg"
            onChange={(file: File | File[]) => {
              if (!Array.isArray(file)) {
                setLoadingImage(file);
                handleAddImage(file);
              }
            }}
          />
        )}
      />
    </Box>
  );
};

export default ProductImageGallery;

const ImagePreview = styled.div(
  ({ theme: { breakpoints, green, dangerRed, border } }) => `
  position:relative;
  border-radius:6px;
  border:${border};
  
    .loading-image {
      filter:blur(4px) brightness(0.9);    
    }
.progress-container {
     position:absolute;
     inset:0;
     display:flex;
     align-items: center;
     justify-content: center;
     padding:4rem;
    }
   
    img {
      width:100%;
      object-fit:cover;
      max-height:200px;
      min-height:200px;
      object-position:top;
      border-bottom:${border};
    }
   
    .remove {
      position: absolute;
      top: 5px;
      right: -5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${dangerRed};
    }
    `
);

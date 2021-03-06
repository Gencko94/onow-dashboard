import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { Control, Controller, SetFieldValue } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import Box from "../../components/reusable/Box/Box";
import { customerUri } from "../../constants";
import useConfirmationModal from "../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../hooks/useToast";
import extractError from "../../utils/extractError";
import MiniFileUploader from "../../utils/MiniFileUploader";

import { removeCategoryImage } from "../../utils/queries/categoriesQueries";

interface IProps {
  errors: any;
  control: Control<any>;
  setValue: SetFieldValue<any>;
  id?: number;
}

const CategoryImage = ({ control, errors, setValue, id }: IProps) => {
  const { mutateAsync: deleteMutation, reset } =
    useMutation(removeCategoryImage);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { handleCloseToast, setToastStatus } = useToast();
  const [progress, setProgress] = useState<number | null>(null);

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
      formData.append("image", image);
      await axios.post(
        `${customerUri}/product-categories-add-image/${id}`,
        formData,
        config
      );
      setProgress(null);
      setValue("image", image);
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

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
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
  const removeImage = async () => {
    try {
      handleCloseConfirmationModal?.();
      await deleteMutation(id!);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Image Removed Successfully",
        type: "success",
      });
      setValue("image", null);
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
  return (
    <Box type="titled" boxTitle="Category Image">
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
              onRemove={() => {
                setConfirmationModalStatus?.({
                  open: true,
                  desc: "Are you sure you want to delete this category image ?",
                  title: "Delete Category Image",
                  closeCb: handleCloseConfirmationModal!,
                  successCb: () => {
                    removeImage();
                  },
                });
              }}
              progress={progress}
            />
          );
        }}
      />
      <ErrorMessage>{errors?.image && "Required"}</ErrorMessage>
    </Box>
  );
};

export default CategoryImage;

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${(props) => props.theme.dangerRed};
`;

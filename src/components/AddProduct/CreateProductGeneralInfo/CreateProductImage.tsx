import { useEffect } from "react";
import { useContext } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";
import { NewProductContext } from "../../../contexts/Product/NewProductContext";
import FileUploader from "../../../utils/FileUploader";
import MiniFileUploader from "../../../utils/MiniFileUploader";
import Box from "../../reusable/Box/Box";
import Button from "../../reusable/Button";
import Spacer from "../../reusable/Spacer";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
import Paragraph from "../../StyledComponents/Paragraph";

interface ImageProps {
  thumbnail: File;
  images: File[];
}
const CreateProductImage = () => {
  const { updateData, setActiveTab, formValues } =
    useContext(NewProductContext);
  const { control, watch, setValue, handleSubmit } = useForm<ImageProps>({
    defaultValues: {
      images: [],
    },
  });
  const onSubmit: SubmitHandler<ImageProps> = (data) => {
    console.log(data);

    setActiveTab?.(2);
    updateData?.(data);
  };
  const onError: SubmitErrorHandler<ImageProps> = (errors) => {
    console.log(errors);
  };
  useEffect(() => {
    setValue("thumbnail", formValues?.thumbnail);
    setValue("images", formValues?.images);
  }, []);
  const thumbnail = watch("thumbnail");
  const images = watch("images");
  const setDefaultImage = (image: File) => {
    if (thumbnail) {
      setValue("thumbnail", image);
      setValue(
        "images",
        images
          .filter((i) => i.lastModified !== image.lastModified)
          .concat(thumbnail)
      );
    }
  };
  const removeThumbnailImage = () => {
    setValue("thumbnail", images[0]);
    setValue(
      "images",
      images.filter((i) => i.lastModified !== images[0].lastModified)
    );
  };
  const removeImage = (image: File) => {
    setValue(
      "images",
      images.filter((i) => i.lastModified !== image.lastModified)
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Flex justify="flex-end">
        <Button
          onClick={() => {
            updateData?.({
              thumbnail,
              images,
            });
            setActiveTab?.(0);
          }}
        >
          Back
        </Button>
        <Spacer size={10} />
        <Button type="submit">Next</Button>
      </Flex>
      <Spacer size={40} />
      <Box
        style={{ alignSelf: "self-start" }}
        type="titled"
        boxTitle="Default Product image"
      >
        <Controller
          control={control}
          name="thumbnail"
          render={({ field: { value, onChange } }) => {
            return (
              <MiniFileUploader
                accept=".png, .jpg, .jpeg"
                image={value}
                onChange={(image) => {
                  onChange(image);
                }}
              />
            );
          }}
        />
      </Box>
      <Box type="titled" boxTitle="Image Gallery">
        <Paragraph>
          High Quality product images are very important when you're offering
          food, Truly delectable images will help your products sell themselfs.
        </Paragraph>

        <Grid columns="1fr" gap="1rem">
          <PreviewContainer>
            <Grid columns="repeat(auto-fill,minmax(200px,1fr))" gap="1rem">
              {/* {thumbnail && (
                <div className="img-preview">
                  <img src={URL.createObjectURL(thumbnail)} alt={`main`} />
                  <div className="default-container">
                    <Flex items="center" justify="center" padding="0.25rem">
                      <p>Default Image</p>
                      <span>
                        <AiOutlineCheckCircle size={20} />
                      </span>
                    </Flex>
                  </div>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => {
                      removeThumbnailImage();
                    }}
                  >
                    <IoMdCloseCircle size={35} />
                  </button>
                </div>
              )} */}
              {images.map((image, index) => {
                return (
                  <div className="img-preview">
                    <img src={URL.createObjectURL(image)} alt={`i-${index}`} />
                    <div className="default-container">
                      <Flex items="center" justify="center" padding="0.25rem">
                        <Button
                          onClick={() => setDefaultImage(image)}
                          color="green"
                        >
                          Set as Default Image
                        </Button>
                      </Flex>
                    </div>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => {
                        removeImage(image);
                      }}
                    >
                      <IoMdCloseCircle size={35} />
                    </button>
                  </div>
                );
              })}
            </Grid>
          </PreviewContainer>

          <Controller
            control={control}
            name="images"
            render={({ field: { onChange, value, ref } }) => (
              <FileUploader
                accept=".png, .jpg, .jpeg"
                onChange={(file: File | File[]) => {
                  if (!Array.isArray(file)) {
                    if (images.length === 0 && !thumbnail) {
                      setValue("thumbnail", file);
                    } else {
                      onChange([...images, file]);
                    }
                  }
                }}
              />
            )}
          />
        </Grid>
      </Box>
      {/* <ErrorMessage>{errors?.images && "Required"}</ErrorMessage> */}
    </form>
  );
};

export default CreateProductImage;

const PreviewContainer = styled.div(
  ({ theme: { breakpoints, green, dangerRed, border } }) => `
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

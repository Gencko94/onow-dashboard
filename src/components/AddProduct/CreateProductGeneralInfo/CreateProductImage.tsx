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
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import FileUploader from "../../../utils/FileUploader";
import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";

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
    <Container>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Flex justify="flex-end">
          <Button
            color="blue"
            onClick={() => {
              console.log(thumbnail);
              updateData?.({
                thumbnail,
                images,
              });
              setActiveTab?.(0);
            }}
            margin="0 0.5rem"
            withTransition
          >
            Back
          </Button>
          <Button type="submit" color="blue">
            Next
          </Button>
        </Flex>
        <Heading tag="h5" color="primary" mb="1rem">
          Product Imaging
        </Heading>

        <DescriptionBox>
          <p>
            High Quality product images are very important when you're offering
            food, Truly delectable images will help your products sell
            themselfs.
          </p>
        </DescriptionBox>
        <Grid cols="1fr" gap="1rem">
          <PreviewContainer>
            <Grid cols="repeat(auto-fill,minmax(200px,1fr))" gap="1rem">
              {thumbnail && (
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
              )}
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

          <Box>
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
          </Box>
        </Grid>
        {/* <ErrorMessage>{errors?.images && "Required"}</ErrorMessage> */}
      </form>
    </Container>
  );
};

export default CreateProductImage;
const Container = styled.div(
  ({ theme: { breakpoints, shadow } }) => `
 
  
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

const Box = styled.div(
  ({ theme: { breakpoints, shadow } }) => `
  padding:1rem;
  .title {
    margin-bottom:1rem;
    text-align:center;
  }
  `
);
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

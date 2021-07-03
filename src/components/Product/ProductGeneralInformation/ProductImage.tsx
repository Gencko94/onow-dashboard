import { Controller, useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { PRODUCT } from "../../../interfaces/products/products";
import { ADD_PRODUCT_IMAGE } from "../../../interfaces/products/update-product";
import FileUploader from "../../../utils/FileUploader";
import MiniFileUploader from "../../../utils/MiniFileUploader";
import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";

interface IProps {
  data: PRODUCT;
}

const ProductImage = ({ data }: IProps) => {
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const {
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ADD_PRODUCT_IMAGE>({
    defaultValues: { images: [], image: data.image },
  });
  const image = watch("image");
  const images = watch("images");
  return (
    <Container>
      <div className="title-container">
        <h5>Product Imaging</h5>
      </div>
      <DescriptionBox>
        <p>
          High Quality product images are very important when you're offering
          food, Truly delectable images will help your products sell themselfs.
        </p>
      </DescriptionBox>

      <Grid cols="1fr" gap="1rem">
        <PreviewContainer>
          <Grid cols="repeat(auto-fill,minmax(200px,1fr))" gap="1rem">
            {image && (
              <div className="img-preview">
                <img src={image} alt={`main`} />
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
                    // removeThumbnailImage();
                  }}
                >
                  <IoMdCloseCircle size={35} />
                </button>
              </div>
            )}
            {images.map((image, index) => {
              return (
                <div className="img-preview">
                  <img src={image} alt={`i-${index}`} />
                  <div className="default-container">
                    <Flex items="center" justify="center" padding="0.25rem">
                      <Button
                        // onClick={() => setDefaultImage(image)}
                        text="Set as Default Image"
                        textSize="0.8rem"
                        bg="green"
                        padding="0.25rem"
                        withRipple
                      />
                    </Flex>
                  </div>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => {
                      // removeImage(image);
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
                  // if (!Array.isArray(file)) {
                  //   if (images.length === 0 && !image) {
                  //     setValue("thumbnail", file);
                  //   } else {
                  //     onChange([...images, file]);
                  //   }
                  // }
                }}
              />
            )}
          />
        </Box>
      </Grid>
      <ErrorMessage>{errors?.images && "Required"}</ErrorMessage>
    </Container>
  );
};

export default ProductImage;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
  margin: 2rem 0;
  display:flex;
  flex-direction:column;
  .title-container {
    padding: 1rem 0;
    color: ${mainColor};
  }
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

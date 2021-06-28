import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { PRODUCT } from "../../../interfaces/products/products";
import { ADD_PRODUCT_IMAGE } from "../../../interfaces/products/update-product";
import FileUploader from "../../../utils/FileUploader";
import MiniFileUploader from "../../../utils/MiniFileUploader";
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

      <Grid cols="1fr 1fr" gap="1rem">
        <Box>
          <h6 className="title">Product Main Image</h6>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, value, ref } }) => (
              <MiniFileUploader
                onChange={(file) => {
                  onChange(file);
                }}
                image={value}
                accept=".png, .jpg, .jpeg"
                onRemove={() => onChange(undefined)}
              />
            )}
          />
        </Box>
        <Box>
          <h6 className="title">Product Image Gallery</h6>
          <FileUploader
            control={control}
            accept="image/*"
            multiple
            name="images"
            setValue={setValue}
            watch={watch}
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

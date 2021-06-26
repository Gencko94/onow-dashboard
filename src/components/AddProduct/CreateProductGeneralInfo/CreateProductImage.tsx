import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import FileUploader from "../../../utils/FileUploader";
import { firstTabInfo } from "./CreateProductGeneralInfo";

const CreateProductImage = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<firstTabInfo>();
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
      <FileUploader
        control={control}
        accept="image/*"
        multiple
        name="images"
        setValue={setValue}
      />
      {/* <ErrorMessage>{errors?.images && "Required"}</ErrorMessage> */}
    </Container>
  );
};

export default CreateProductImage;
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

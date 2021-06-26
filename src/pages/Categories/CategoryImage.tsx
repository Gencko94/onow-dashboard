import { Control, SetFieldValue, useForm } from "react-hook-form";
import styled from "styled-components";
import FileUploader from "../../utils/FileUploader";

interface IProps {
  errors: any;
  control: Control<any>;
  setValue: SetFieldValue<any>;
}

const CategoryImage = ({ control, errors, setValue }: IProps) => {
  return (
    <Container>
      <div className="title-container">
        <h5>Category Image</h5>
      </div>

      <FileUploader
        control={control}
        accept="image/*"
        name="image"
        setValue={setValue}
      />
      <ErrorMessage>{errors?.image && "Required"}</ErrorMessage>
    </Container>
  );
};

export default CategoryImage;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
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

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${(props) => props.theme.dangerRed};
`;

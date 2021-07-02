import { Control, Controller, SetFieldValue, useForm } from "react-hook-form";
import styled from "styled-components";
import Heading from "../../components/StyledComponents/Heading";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import FileUploader from "../../utils/FileUploader";
import MiniFileUploader from "../../utils/MiniFileUploader";

interface IProps {
  errors: any;
  control: Control<any>;
  setValue: SetFieldValue<any>;
}

const CategoryImage = ({ control, errors, setValue }: IProps) => {
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  return (
    <Container>
      <div className="title-container">
        <Heading tag="h5" color="primary">
          Category Image
        </Heading>
      </div>

      <div className="box">
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => {
            return (
              <MiniFileUploader
                accept=".png, .jpg, .jpeg"
                image={value}
                onChange={(image) => {
                  onChange(image);
                }}
                onRemove={() => {
                  setConfirmationModalStatus?.({
                    open: true,
                    desc: "Are you sure you want to delete this category image ?",
                    title: "Delete Category Image",
                    closeCb: handleCloseConfirmationModal!,
                    successCb: () => {},
                  });
                }}
              />
            );
          }}
        />
        <ErrorMessage>{errors?.image && "Required"}</ErrorMessage>
      </div>
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
  }
  .box {
    flex:1;
    background-color: #fff;
    box-shadow: ${shadow};
    border-radius: 6px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    // gap: 1rem;
  }
  @media ${breakpoints.md} {
    .box {
      grid-template-columns: 1fr ;

    }
  }
  `
);

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${(props) => props.theme.dangerRed};
`;

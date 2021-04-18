import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { NEW_PRODUCT } from '../../../interfaces/products/products';
import FileUploader from '../../../utils/FileUploader';

const ProductImage = () => {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext<NEW_PRODUCT>();

  return (
    <Container>
      <Title>Product Image</Title>
      <FileUploader
        control={control}
        accept="image/*"
        multiple
        setValue={setValue}
      />
      <ErrorMessage>{errors?.image && 'Required'}</ErrorMessage>
    </Container>
  );
};

export default ProductImage;
const Container = styled.div`
  position: relative;
`;
const Title = styled.h6`
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;

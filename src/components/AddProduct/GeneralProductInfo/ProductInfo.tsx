import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { NEW_PRODUCT } from '../../../interfaces/products/products';

const ProductInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT>();
  return (
    <Container>
      <h5 className="title">Product Naming</h5>
      <NameContainer>
        <InputContainer>
          <Label>Product Name English</Label>
          <Input {...register?.('name', { required: 'Required Field' })} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputContainer>
        <InputContainer>
          <Label>Product Name Arabic</Label>
          <Input {...register?.('name_ar', { required: 'Required Field' })} />
          <ErrorMessage>{errors?.name_ar?.message}</ErrorMessage>
        </InputContainer>
      </NameContainer>
    </Container>
  );
};

export default ProductInfo;
const Container = styled.div`
  margin-bottom: 2rem;
  .title {
    margin-bottom: 0.5rem;
    font-weight: ${props => props.theme.font.bold};
    border-bottom: ${props => props.theme.border};
    padding-bottom: 0.5rem;
  }
`;

const NameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;
const InputContainer = styled.div``;

const Label = styled.label`
  color: ${({ theme }) => theme.headingColor};
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  font-weight: ${props => props.theme.font.regular};
  display: inline-block;
`;
const Input = styled.input`
  padding: 0.5rem;
  border: ${props => props.theme.btnBorder};
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  font-size: 0.9rem;
  border-radius: 5px;
  background-color: ${props => props.theme.inputColorLight};
  color: ${props => props.theme.headingColor};
`;

const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;

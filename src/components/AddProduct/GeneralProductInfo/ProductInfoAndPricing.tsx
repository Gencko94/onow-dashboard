import { useContext } from 'react';
import styled from 'styled-components';
import { AddProductProvider } from '../../../pages/AddProduct';

const ProductInfoAndPricing = () => {
  const { register, errors } = useContext(AddProductProvider);
  return (
    <Container>
      <Title>Product Naming & Pricing</Title>
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
      <hr />
      <PricingContainer>
        <InputContainer>
          <Label>Product Price </Label>
          <PriceInputContainer>
            <PriceInput
              {...register?.('price', { required: 'Required Field' })}
            />
            <Currency>KD</Currency>
          </PriceInputContainer>
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputContainer>
      </PricingContainer>
    </Container>
  );
};

export default ProductInfoAndPricing;
const Container = styled.div``;
const Title = styled.h6`
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
`;
const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: 200px;
  gap: 0.75rem;
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
const PriceInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.inputColorLight};
  color: ${props => props.theme.headingColor};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
const PriceInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 0.9rem;
`;
const Currency = styled.p`
  padding: 0.5rem;
  font-size: 0.8rem;
`;
const ErrorMessage = styled.p`
  font-size: 0.7rem;
  padding-top: 0.25rem;
  color: ${props => props.theme.dangerRed};
`;

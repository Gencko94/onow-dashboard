import styled from 'styled-components';

const ProductDimentions = () => {
  return (
    <Container>
      <Title>Product Dimentions & Specs</Title>
      <InputsContainer>
        <div>
          <Label>Product Weight</Label>
          <Input />
        </div>
        <div>
          <Label>Product Length</Label>
          <Input />
        </div>
        <div>
          <Label>Product Height</Label>
          <Input />
        </div>
      </InputsContainer>
    </Container>
  );
};

export default ProductDimentions;
const Container = styled.div``;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;
const Title = styled.h6`
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.font.xbold};
`;
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

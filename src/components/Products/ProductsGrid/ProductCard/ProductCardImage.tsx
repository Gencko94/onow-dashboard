import styled from 'styled-components';

interface IProps {
  src: string;
}

const ProductCardImage = ({ src }: IProps) => {
  return (
    <Container>
      <Image src={src} alt="alt" />
    </Container>
  );
};

export default ProductCardImage;
const Container = styled.div`
  height: 200px;
  background-color: #fff;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

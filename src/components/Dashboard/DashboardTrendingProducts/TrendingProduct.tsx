import styled from "styled-components";
import Flex from "../../StyledComponents/Flex";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
import Paragraph from "../../StyledComponents/Paragraph";

interface ProductProps {
  name: string;
  price: string;
  totalOrders: string;
  image: string;
}

const TrendingProduct = ({ name, price, totalOrders, image }: ProductProps) => {
  return (
    <Container>
      <div className="img-container">
        <img src={image} alt="" />
      </div>
      <div className="product-body">
        <Grid cols="1fr 1fr" gap="0.25rem" p={4}>
          <Flex column items="flex-start">
            <Paragraph
              fontSize="0.9rem"
              mb="0.5rem"
              color="textPrimary"
              weight="semibold"
            >
              {name}
            </Paragraph>
            <Flex justify="flex-end">
              <Paragraph fontSize="0.9rem" color="textSecondary">
                Orders:
              </Paragraph>
              <Heading tag="h6" weight="semibold" margin="0 0.25rem">
                {totalOrders}
              </Heading>
            </Flex>
          </Flex>
          <Flex column justify="flex-end">
            <Flex justify="flex-end">
              <Paragraph
                fontSize="1rem"
                mb="0.5rem"
                color="textPrimary"
                weight="bold"
              >
                {price} KD
              </Paragraph>
            </Flex>
            <Flex justify="flex-end">
              <Paragraph fontSize="0.9rem" color="textSecondary">
                Revenue:
              </Paragraph>
              <Heading tag="h6" weight="semibold" margin="0 0.25rem">
                {price + 365} KD
              </Heading>
            </Flex>
          </Flex>
        </Grid>
      </div>
    </Container>
  );
};

export default TrendingProduct;
const Container = styled.div`
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.shadow};
  overflow: hidden;
  .product-body {
    background-color: ${(props) => props.theme.accent3};
  }
  .img-container {
    height: 200px;
    max-height: 200px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

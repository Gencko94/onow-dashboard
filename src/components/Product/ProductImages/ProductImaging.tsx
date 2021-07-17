import { SubmitHandler, useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";
import styled from "styled-components";
import { PRODUCT } from "../../../interfaces/products/products";
import Button from "../../reusable/Button";
import Flex from "../../StyledComponents/Flex";
import ProductImage from "../ProductGeneralInformation/ProductImage";

interface IProps {
  data: PRODUCT;
}

const ProductImaging = ({ data }: IProps) => {
  return (
    <Container>
      <Flex justify="flex-end">
        {/* <Button
          text="Save Changes"
          textSize="0.9rem"
          iconSize={25}
          Icon={MdSave}
          bg="green"
          padding="0.5rem"
          onClick={methods.handleSubmit(onSubmit)}
        /> */}
      </Flex>

      <ProductImage data={data} />
    </Container>
  );
};

export default ProductImaging;
const Container = styled.div`
  background-color: #fff;
`;

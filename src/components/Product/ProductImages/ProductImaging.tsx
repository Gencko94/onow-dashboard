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
export interface FORM_PROPS {
  max_qty_per_user: number;
  prep_time: {
    time: number;
    unit: string;
  };
  allow_side_notes: boolean;
  allow_attachments: boolean;
  branch_availability: {
    all: boolean;
    branches: number[];
  };
}
const ProductImaging = ({ data }: IProps) => {
  const methods = useForm<FORM_PROPS>({
    defaultValues: {
      allow_attachments: data.allow_attachments,
      allow_side_notes: data.allow_side_notes,
      branch_availability: data.branch_availability,
      max_qty_per_user: data.max_qty_per_user,
      prep_time: data.prep_time,
    },
  });
  const onSubmit: SubmitHandler<FORM_PROPS> = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Flex justify="flex-end">
        <Button
          text="Save Changes"
          textSize="0.9rem"
          iconSize={25}
          Icon={MdSave}
          bg="green"
          padding="0.5rem"
          onClick={methods.handleSubmit(onSubmit)}
        />
      </Flex>

      <ProductImage data={data} />
    </Container>
  );
};

export default ProductImaging;
const Container = styled.div`
  background-color: #fff;
`;

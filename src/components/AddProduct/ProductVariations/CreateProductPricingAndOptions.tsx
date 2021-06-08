import styled from "styled-components";
import CreateProductPricing from "./CreateProductPricing";
import Hr from "../../StyledComponents/Hr";
import CreateProductOptions from "./CreateProductOptions";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { PRODUCT_OPTION } from "../../../interfaces/products/create-new-product";
import Flex from "../../StyledComponents/Flex";
import BlueButton from "../../reusable/BlueButton";
import { useContext } from "react";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
export interface secondTabProps {
  price: number;
  price_by_options: boolean;
  variations_enabled: boolean;
  options: PRODUCT_OPTION[];
}

const CreateProductPricingAndOptions = () => {
  const { updateData, setActiveTab, formValues } =
    useContext(NewProductContext);
  const methods = useForm<secondTabProps>({
    defaultValues: {
      price: formValues?.price,
      variations_enabled:
        formValues?.price_by_options === true
          ? true
          : formValues?.options?.length! > 0
          ? true
          : false,
      price_by_options: formValues?.price_by_options,
      options: formValues?.options,
    },
  });
  console.log(formValues?.options);

  const onSubmit: SubmitHandler<secondTabProps> = (data) => {
    console.log(data);
    updateData?.(methods.watch());
    setActiveTab?.(2);
  };
  const onError: SubmitErrorHandler<secondTabProps> = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <Flex justify="flex-end">
        <BlueButton
          onClick={() => {
            console.log(methods.watch());
            updateData?.(methods.watch());
            setActiveTab?.(0);
          }}
          type="button"
          title="back"
        />
        <BlueButton
          onClick={methods.handleSubmit(onSubmit, onError)}
          type="submit"
          title="Next"
        />
      </Flex>
      <Container onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <CreateProductPricing />
        <Hr />
        <CreateProductOptions />
      </Container>
    </FormProvider>
  );
};

export default CreateProductPricingAndOptions;

const Container = styled.form`
  background-color: #fff;
`;

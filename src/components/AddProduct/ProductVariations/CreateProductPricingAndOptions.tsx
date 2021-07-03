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
import { useContext } from "react";
import { NewProductContext } from "../../../pages/Product/CreateNewProduct";
import Button from "../../reusable/Button";
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

  const onSubmit: SubmitHandler<secondTabProps> = (data) => {
    let safeToProceed = true;
    if (data.price_by_options === true) {
      let foundTrue = false;
      for (let i = 0; i < data.options.length; i++) {
        console.log(data.options[i]);
        if (data.options[i].required === true) {
          foundTrue = true;
        }
      }
      if (!foundTrue) {
        safeToProceed = false;
      }
    }

    if (safeToProceed === true) {
      updateData?.(data);
      setActiveTab?.(3);
    } else {
      console.log("One Must be Required");
      methods.setError("options.0.required", {
        message: "Atleast one should be required",
      });
      methods.setFocus("options.0.required");
    }
  };
  const onError: SubmitErrorHandler<secondTabProps> = (errors) => {
    console.log(errors);
  };

  return (
    <FormProvider {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Flex justify="flex-end">
          <Button
            text="Back"
            bg="blue"
            onClick={() => {
              updateData?.(methods.watch());
              setActiveTab?.(1);
            }}
            padding="0.5rem"
            textSize="0.9rem"
            margin="0 0.5rem"
            withRipple
            withTransition
          />
          <Button
            withRipple
            withTransition
            text="Next"
            bg="blue"
            type="submit"
            padding="0.5rem"
            textSize="0.9rem"
          />
        </Flex>
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

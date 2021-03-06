import CreateProductPricing from "./CreateProductPricing";
import Hr from "../../StyledComponents/Hr";
import CreateProductOptions from "./CreateProductOptions";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { NEW_PRODUCT_OPTION } from "../../../interfaces/products/create-new-product";
import Flex from "../../StyledComponents/Flex";
import { useContext } from "react";
import Button from "../../reusable/Button";
import Spacer from "../../reusable/Spacer";
import { NewProductContext } from "../../../contexts/Product/NewProductContext";
export interface secondTabProps {
  price: number;
  price_by_options: boolean;
  options_enabled: boolean;
  options: NEW_PRODUCT_OPTION[];
}

const CreateProductPricingAndOptions = () => {
  const { updateData, setActiveTab, formValues } =
    useContext(NewProductContext);
  const methods = useForm<secondTabProps>({
    defaultValues: {
      price: formValues?.price,
      options_enabled:
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
      methods.setError("options.0.required", {
        message: "Atleast one should be required",
      });
      methods.setFocus("options.0.required");
    }
  };
  const onError: SubmitErrorHandler<secondTabProps> = (errors) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <Flex justify="flex-end">
          <Button
            color="blue"
            onClick={() => {
              updateData?.(methods.watch());
              setActiveTab?.(1);
            }}
            margin="0 0.5rem"
            withTransition
          >
            Back
          </Button>
          <Spacer size={10} />
          <Button withTransition color="blue" type="submit">
            Next
          </Button>
        </Flex>
        <Spacer size={40} />
        <CreateProductPricing />
        <Hr />
        <CreateProductOptions />
      </form>
    </FormProvider>
  );
};

export default CreateProductPricingAndOptions;

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { MdSubtitles } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import { NEW_PRODUCT_OPTION } from "../../../../interfaces/products/create-new-product";
import Button from "../../../reusable/Button";

import IconedNumberInput from "../../../reusable/IconedNumberInput";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Select from "../../../reusable/Select";
import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";
import { secondTabProps } from "../CreateProductPricingAndOptions";
import OptionValue from "./CreateProductOptionValue";
const selectTypes = [
  { value: "single", label: "Single Select" },
  { value: "multiple", label: "Multiple Select" },
];
const requiredOptions = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];
interface IProps {
  option: NEW_PRODUCT_OPTION;
  index: number;
  removeOption: (index?: number | number[] | undefined) => void;
}

const CreateProductOption = ({ option, index, removeOption }: IProps) => {
  const {
    control,
    watch,
    formState: { errors },
    register,
    clearErrors,
  } = useFormContext<secondTabProps>();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `options.${index}.values` as const, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const options = watch("options");
  const optionsEnabled = watch("options_enabled");
  const optionType = watch(`options.${index}.select_type` as const);

  return (
    <Container>
      <Flex items="center" justify="space-between" margin="0 0 1rem 0">
        <Heading tag="h5" color="subheading">
          Option {index + 1}
        </Heading>
        <button
          type="button"
          onClick={() => {
            if (options.length > 1) removeOption(index);
          }}
          className="delete"
        >
          <TiDelete size={30} />
        </button>
      </Flex>
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0.5rem">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.options?.[index]?.name?.en}
          name={`options.${index}.name.en`}
          register={register}
          label="Option Name English"
          required={optionsEnabled}
          requiredMessage="Required"
          defaultValue={options[index]?.name?.en}
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.options?.[index]?.name?.ar}
          name={`options.${index}.name.ar`}
          register={register}
          label="Option Name Arabic"
          required={optionsEnabled}
          defaultValue={options[index]?.name?.ar}
          requiredMessage="Required"
        />
        <Controller
          control={control}
          name={`options.${index}.select_type` as any}
          defaultValue={options[index].select_type}
          render={({ field: { value, onChange, ref } }) => {
            return (
              <Select
                ref={ref}
                value={
                  selectTypes.find(
                    (i) => i.value === options[index].select_type
                  ) as {
                    value: string;
                    label: string;
                  }
                }
                options={selectTypes}
                defaultValue={value}
                errors={errors?.options?.[index]?.select_type}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                label="Option Type"
                onChange={(val) => onChange(val.value)}
              />
            );
          }}
        />

        {optionType === "multiple" && (
          <IconedNumberInput
            Icon={MdSubtitles}
            errors={errors?.options?.[index]?.max_picks}
            name={`options.${index}.max_picks`}
            register={register}
            label="Maximum choice selections"
            min={0}
            defaultValue={options[index]?.max_picks}
            desc="0 For Unlimited"
          />
        )}
        <Controller
          control={control}
          defaultValue={options?.[index]?.required}
          name={`options.${index}.required` as any}
          render={({ field: { value, onChange, ref } }) => {
            return (
              <Select
                ref={ref}
                value={
                  requiredOptions.find(
                    (i) => i.value === options[index].required
                  ) as {
                    value: boolean;
                    label: string;
                  }
                }
                onChange={(val) => {
                  onChange(val.value);
                  clearErrors("options.0.required");
                }}
                options={requiredOptions}
                defaultValue={value}
                errors={errors?.options?.[index]?.required}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option: any) => option.value}
                label="Required"
              />
            );
          }}
        />
      </Grid>
      <Heading tag="h6" color="heading">
        Options Values
      </Heading>

      {fields.length > 0 && (
        <div className="values">
          {fields.map((field, childIndex) => {
            return (
              <OptionValue
                key={field.id}
                index={childIndex}
                parentIndex={index}
                removeValue={remove}
                valuesCount={fields.length}
              />
            );
          })}
          <Flex items="center" justify="center">
            <Button
              withRipple
              withTransition
              text="Add New Value"
              bg="primary"
              padding="0.5rem"
              onClick={() =>
                append(
                  { name: { ar: "", en: "" }, price: "", qty: 0, sku: "" },
                  { shouldFocus: false }
                )
              }
              textSize="0.9rem"
              Icon={BiPlus}
            />
          </Flex>
        </div>
      )}
    </Container>
  );
};

export default CreateProductOption;
const Container = styled.div(
  ({ theme: { breakpoints, border, dangerRed } }) => `
  border: ${border};
  border-radius: 6px;
  padding: 0.5rem 1rem 1rem 1rem;
  margin: 1rem 0;
  .delete {
    color: ${dangerRed};
  }
  
  .values {
    padding: 0;
  }
  @media ${breakpoints.md}{
    .values {
      padding: 0 1rem;
    }
  }
  `
);

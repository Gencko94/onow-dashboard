import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import { PRODUCT_OPTION } from "../../../../interfaces/products/create-new-product";

import EmptyTable from "../../../reusable/EmptyTable";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Select from "../../../reusable/Select";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";
import { secondTabProps } from "../CreateProductPricingAndOptions";
import OptionValue from "./OptionValue";
const selectTypes = [
  { value: "single", label: "Single Select" },
  { value: "multiple", label: "Multiple Select" },
];
const requiredOptions = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];
interface IProps {
  option: PRODUCT_OPTION;
  index: number;
  removeOption: (index?: number | number[] | undefined) => void;
}

const Variation = ({ option, index, removeOption }: IProps) => {
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
  const optionType = watch(`options.${index}.select_type` as const);

  return (
    <Container>
      <Flex justify="flex-end">
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

      <div className="inputs">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.options?.[index]?.name?.en}
          name={`options.${index}.name.en`}
          register={register}
          label="Option Name English"
          required
          requiredMessage="Required"
          defaultValue={options[index]?.name?.en}
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.options?.[index]?.name?.ar}
          name={`options.${index}.name.ar`}
          register={register}
          label="Option Name Arabic"
          required
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
      </div>
      <h6 className="title">Options Values</h6>
      {fields.length === 0 && (
        <div className="no-values-container">
          <EmptyTable
            height="100%"
            btnText="Add New Option Value"
            text="No Values were Added"
            withButton
            cb={() =>
              append({
                name: { ar: "", en: "", price: "", sku: "" },
              })
            }
          />
        </div>
      )}

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
          <div className="add-button">
            <button
              type="button"
              onClick={() =>
                append({ name: { ar: "", en: "" }, price: "", qty: 0, sku: "" })
              }
            >
              Add new value
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Variation;
const Container = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0.5rem 1rem 1rem 1rem;
  margin: 1rem 0;
  ${FlexWrapper} {
    margin: 0 !important;
    .delete {
      color: ${(props) => props.theme.dangerRed};
    }
  }
  .title {
    color: ${(props) => props.theme.subHeading};
  }
  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
  }
  .no-values-container {
    background-color: ${(props) => props.theme.overlayColor};
    height: 200px;
    border: ${(props) => props.theme.border};
    border-radius: 6px;
  }
  .values {
    padding: 0 1rem;
    .add-button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      button {
        background-color: ${(props) => props.theme.mainColor};
        color: #fff;
        padding: 0.5rem;
        font-size: 0.9rem;
        border-radius: 6px;
        transition: transform 75ms ease;
        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }
`;

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import {
  NEW_PRODUCT_FORM_PROPS,
  PRODUCT_OPTION,
} from "../../../../interfaces/products/create-new-product";

import EmptyTable from "../../../reusable/EmptyTable";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Select from "../../../reusable/Select";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";
import OptionValue from "./OptionValue";
const selectTypes = [
  { value: "single", label: "Single Select" },
  { value: "multiple", label: "Multiple Select" },
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
  } = useFormContext<NEW_PRODUCT_FORM_PROPS>();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `variations.${index}.values` as const, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const optionType = watch(`variations.${index}.select_type` as const);
  return (
    <Container>
      <Flex justify="flex-end">
        <button
          type="button"
          onClick={() => removeOption(index)}
          className="delete"
        >
          <TiDelete size={30} />
        </button>
      </Flex>

      <div className="inputs">
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.variations?.[index]?.name?.en}
          name={`variations.${index}.name.en`}
          register={register}
          label="Option Name English"
        />
        <IconedInput
          Icon={MdSubtitles}
          errors={errors?.variations?.[index]?.name?.ar}
          name={`variations.${index}.name.ar`}
          register={register}
          label="Option Name Arabic"
        />
        <Controller
          control={control}
          name={`variations.${index}.select_type` as const}
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                options={selectTypes}
                defaultValue={selectTypes[0]}
                errors={errors?.variations?.[index]?.select_type}
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
            errors={errors?.variations?.[index]?.max_picks}
            name={`variations.${index}.max_picks`}
            register={register}
            label="Maximum Selections"
            min={0}
            desc="0 For Unlimited"
          />
        )}
        <Controller
          control={control}
          name={`variations.${index}.required` as const}
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                onChange={(val) => onChange(val.value)}
                options={[
                  { value: false, label: "No" },
                  { value: true, label: "Yes" },
                ]}
                defaultValue={{ id: 1, name: "Yes" }}
                errors={errors?.variations?.[index]?.required}
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
            btnText="Add New Option Value"
            text="No Values were Added"
            withButton
            cb={() => append({})}
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
              />
            );
          })}
          <div className="add-button">
            <button type="button" onClick={() => append({})}>
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

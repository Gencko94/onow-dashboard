import styled from "styled-components";

import ModalHead from "../../../Modal/ModalHead";
import ModalTail from "../../../reusable/ModalTail";

import { Controller } from "react-hook-form";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Grid from "../../../StyledComponents/Grid";
import { useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import Select from "../../../reusable/Select";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import { SubmitHandler } from "react-hook-form";
import { PRODUCT_OPTION } from "../../../../interfaces/products/products";

import { ModalWrapper } from "../../../Modal/ModalWrapper";
import { up } from "../../../../utils/themes";
const selectTypes = [
  { value: "single", label: "Single Select" },
  { value: "multiple", label: "Multiple Select" },
];
const requiredOptions = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

interface ModalProps {
  /**
   * Function to execute when the confirm button is clicked
   */
  closeFunction: () => void;
  /**
   * The Close Function
   */
  successFunction: (data: NEW_OPTION | PRODUCT_OPTION) => void;

  /**
   * Boolean controlling the modal state
   */
  isOpen: boolean;

  /**
   * Success button loading state
   */
  isLoading?: boolean;
  defaultValues?: PRODUCT_OPTION;
  title: string;
}

export type NEW_OPTION = {
  select_type: "single" | "multiple";
  max_picks: number | undefined;
  name: {
    [key: string]: string;
  };
  required: boolean;
};
const NewOptionModal = ({
  closeFunction,
  isOpen,

  successFunction,
  defaultValues,
  title,
  isLoading,
}: ModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PRODUCT_OPTION>({
    defaultValues: {
      id: defaultValues?.id,
      max_picks: defaultValues?.max_picks,
      name: defaultValues?.name,
      required: defaultValues?.required,
      select_type: defaultValues?.select_type,
    },
    shouldUnregister: true,
  });
  const selectType = watch("select_type");
  const required = watch("required");
  const onSubmit: SubmitHandler<NEW_OPTION | PRODUCT_OPTION> = (data) => {
    if (defaultValues?.id) {
      successFunction({ id: defaultValues?.id, ...data });
    } else {
      successFunction(data);
    }
  };

  return (
    <Modal>
      <ModalHead closeFunction={closeFunction} title={title} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Grid cols="minmax(200px,1fr)" gap="0.5rem">
            <IconedInput
              Icon={MdSubtitles}
              errors={errors?.name?.en}
              name="name.en"
              register={register}
              label="Option Name English"
              required
              requiredMessage="Required"
            />
            <IconedInput
              Icon={MdSubtitles}
              errors={errors?.name?.ar}
              name="name.ar"
              register={register}
              label="Option Name Arabic"
              required
              requiredMessage="Required"
            />
          </Grid>
          <Grid cols="minmax(200px,1fr)" gap="1.2rem">
            <Controller
              control={control}
              name="select_type"
              render={({ field: { value, onChange, ref } }) => {
                return (
                  <Select
                    ref={ref}
                    value={
                      selectTypes.find((i) => i.value === selectType) as {
                        value: string;
                        label: string;
                      }
                    }
                    options={selectTypes}
                    defaultValue={value}
                    errors={errors?.select_type}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    label="Option Type"
                    onChange={(val) => onChange(val.value)}
                  />
                );
              }}
            />

            {selectType === "multiple" && (
              <IconedNumberInput
                Icon={MdSubtitles}
                errors={errors?.max_picks}
                name="max_picks"
                register={register}
                label="Maximum choice selections"
                min={0}
                desc="0 For Unlimited"
              />
            )}
            <Controller
              control={control}
              name="required"
              render={({ field: { value, onChange, ref } }) => {
                return (
                  <Select
                    ref={ref}
                    value={
                      requiredOptions.find((i) => i.value === required) as {
                        value: boolean;
                        label: string;
                      }
                    }
                    onChange={(val) => {
                      onChange(val.value);
                    }}
                    options={requiredOptions}
                    defaultValue={value}
                    errors={errors?.required}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option: any) => option.value}
                    label="Required"
                  />
                );
              }}
            />
          </Grid>
          <ModalTail
            btnType="submit"
            btnText={"Save"}
            successCb={() => {}}
            closeFunction={closeFunction}
            isLoading={isLoading}
          />
        </Body>
      </form>
    </Modal>
  );
};

export default NewOptionModal;
const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, shadow, accent1 } }) => `
  position: fixed;
  z-index: 20;
  inset:240px 20px;
  position:fixed;
  min-width:300px;
  border:none;
  outline:none;
  z-index:20;
  background-color:${accent1};
  ${up(breakpoints.md)}{
    inset:220px 250px;
  }
  ${up(breakpoints.lg)}{
    inset:220px 350px;
  }
  ${up(breakpoints.xl)}{
    inset:220px 600px;
  }
  `
);
const Body = styled.div(
  ({ theme: { breakpoints, border } }) => `

  width: 100%;
  height: 100%;
  display: grid;
  padding: 0.75rem;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  ${up(breakpoints.md)}{
   padding:1rem;
  }
  
  `
);

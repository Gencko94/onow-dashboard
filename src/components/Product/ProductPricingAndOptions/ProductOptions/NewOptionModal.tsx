import styled from "styled-components";

import ModalHead from "../../../Modal/ModalHead";
import ModalTail from "../../../Modal/ModalTail";

import { Controller } from "react-hook-form";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Grid from "../../../StyledComponents/Grid";
import { useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import Select from "../../../reusable/Select";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import { SubmitHandler } from "react-hook-form";
import { PRODUCT_OPTION } from "../../../../interfaces/products/products";

import { up } from "../../../../utils/themes";
import { animated, useTransition } from "@react-spring/web";
import { DialogContent, DialogOverlay } from "@reach/dialog";
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
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <AnimatedDialogOverlay
              onDismiss={closeFunction}
              style={{ opacity: styles.opacity }}
            >
              <AnimatedDialogContent
                aria-labelledby="dialog-title"
                style={{
                  transform: styles.y.to(
                    (value) => `translate3d(0px, ${value}px, 0px)`
                  ),
                }}
              >
                <ModalHead closeFunction={closeFunction} title={title} />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid columns="minmax(200px,1fr)" gap="0.5rem" padding="1rem">
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

                    <Controller
                      control={control}
                      name="select_type"
                      render={({ field: { value, onChange, ref } }) => {
                        return (
                          <Select
                            ref={ref}
                            value={
                              selectTypes.find(
                                (i) => i.value === selectType
                              ) as {
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
                              requiredOptions.find(
                                (i) => i.value === required
                              ) as {
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
                </form>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  );
};

export default NewOptionModal;
const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = styled(animated(DialogContent))(
  ({ theme: { breakpoints, subtleBackground } }) => `
  min-width:300px;
  width:300px;
  
  background-color:${subtleBackground};
  ${up(breakpoints.md)}{
    min-width:400px;
   
  }
  
`
);

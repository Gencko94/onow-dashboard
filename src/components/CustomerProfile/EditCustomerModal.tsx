import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import styled from "styled-components";
import { CUSTOMER } from "../../interfaces/customers/customers";
import { useMutation, useQueryClient } from "react-query";
import { editCustomer } from "../../utils/queries";
import IconedInput from "../reusable/Inputs/IconedInput";
import { useTranslation } from "react-i18next";
import PhoneInput from "../reusable/Inputs/PhoneInput";

import extractError from "../../utils/extractError";
import useToast from "../../hooks/useToast";

import Grid from "../StyledComponents/Grid";
import { up } from "../../utils/themes";
import { animated, useTransition } from "@react-spring/web";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import ModalHead from "../Modal/ModalHead";
import ModalTail from "../Modal/ModalTail";

interface IProps {
  closeFunction: () => void;
  open: boolean;
  data: CUSTOMER;
}
const EditCustomerModal = ({ closeFunction, open, data }: IProps) => {
  const transitions = useTransition(open, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CUSTOMER>({ defaultValues: data });
  const {
    i18n: { language },
  } = useTranslation();
  const queryClient = useQueryClient();
  const {
    mutateAsync: editMutation,
    isLoading: editLoading,
    reset,
  } = useMutation(editCustomer, {
    onSuccess: (_, args) => {
      queryClient.invalidateQueries("customers");
      queryClient.setQueryData(["customer", data.id], () => {
        return { ...data, ...args };
      });
      closeFunction();
    },
    onError: (error) => {
      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    },
  });
  const onSubmit: SubmitHandler<CUSTOMER> = async (data) => {
    console.log(data);
    await editMutation(data);
    setToastStatus?.({
      fn: () => {
        handleCloseToast?.();
      },
      open: true,
      text: "Customer Updated Successfully",
      type: "success",
    });
  };

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
                <ModalHead
                  closeFunction={closeFunction}
                  title="Edit Customer"
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid cols="1fr" gap="0.5rem" p={4}>
                    <IconedInput
                      Icon={MdSubtitles}
                      errors={errors?.first_name}
                      register={register}
                      required
                      label="Customer First Name"
                      name="first_name"
                      requiredMessage="Required"
                    />
                    <IconedInput
                      Icon={MdSubtitles}
                      errors={errors?.last_name}
                      register={register}
                      required
                      requiredMessage="Required"
                      label="Customer Last Name"
                      name="last_name"
                    />

                    <Controller
                      name="phone"
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <PhoneInput
                            label="Phone Number"
                            value={value}
                            errors={errors?.phone}
                            onChange={(data) => onChange(`+${data}`)}
                          />
                        );
                      }}
                    />

                    <IconedInput
                      Icon={HiOutlineMail}
                      errors={errors?.email}
                      register={register}
                      label="Customer Email Address"
                      name="email"
                    />
                  </Grid>
                  <ModalTail
                    btnText="Submit"
                    closeFunction={() => closeFunction()}
                    successCb={() => {}}
                    btnType="submit"
                    isLoading={editLoading}
                  />
                </form>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  );
};

export default EditCustomerModal;
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

const AnimatedDialogOverlay = animated(DialogOverlay);

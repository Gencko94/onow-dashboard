import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import styled from "styled-components";
import { NEW_CUSTOMER } from "../../interfaces/customers/customers";
import { useMutation, useQueryClient } from "react-query";
import { createCustomer } from "../../utils/queries";
import IconedInput from "../reusable/Inputs/IconedInput";
import { useTranslation } from "react-i18next";
import PhoneInput from "../reusable/Inputs/PhoneInput";
import ModalTail from "../reusable/ModalTail";
import extractError from "../../utils/extractError";
import useToast from "../../hooks/useToast";

import ModalHead from "./ModalHead";

import Grid from "../StyledComponents/Grid";
import { ModalWrapper } from "./ModalWrapper";
import { up } from "../../utils/themes";

interface IProps {
  closeFunction: () => void;
}
const AddCustomerModal = ({ closeFunction }: IProps) => {
  const { setToastStatus, handleCloseToast } = useToast();
  const {
    i18n: { language },
  } = useTranslation();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NEW_CUSTOMER>();
  const {
    mutateAsync: createNewCustomer,
    isLoading,
    reset,
  } = useMutation(createCustomer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("customers");
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
  const onSubmit: SubmitHandler<NEW_CUSTOMER> = async (data) => {
    await createNewCustomer({
      ...data,
    });

    closeFunction();
  };

  return (
    <Modal>
      <ModalHead closeFunction={closeFunction} title="New Customer" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Grid cols="1fr" gap="0.5rem">
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
              required
              requiredMessage="Required"
              label="Customer Email Address"
              name="email"
            />
          </Grid>
          <ModalTail
            btnText="Create new Customer"
            closeFunction={() => closeFunction()}
            successCb={() => {}}
            btnType="submit"
            isLoading={isLoading}
          />
        </Body>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;
const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, subtleBackground } }) => `
  min-width:300px;
  z-index:20;
  background-color:${subtleBackground};
  ${up(breakpoints.md)}{
    // inset:200px 250px;
  }
  ${up(breakpoints.lg)}{
    // inset:200px 350px;
  }
  ${up(breakpoints.xl)}{
    // inset:200px 600px;
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

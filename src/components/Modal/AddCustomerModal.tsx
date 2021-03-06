import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import styled from "styled-components";
import { NEW_CUSTOMER } from "../../interfaces/customers/customers";
import { useMutation, useQueryClient } from "react-query";
import { createCustomer } from "../../utils/queries";
import Input from "../reusable/Input/Input";

import PhoneInput from "../reusable/Inputs/PhoneInput";
import ModalTail from "./ModalTail";
import extractError from "../../utils/extractError";
import useToast from "../../hooks/useToast";
import ModalHead from "./ModalHead";

import Grid from "../StyledComponents/Grid";

import { animated, useTransition } from "@react-spring/web";
import { DialogContent, DialogOverlay } from "@reach/dialog";

interface IProps {
  closeFunction: () => void;
  open: boolean;
}
const AddCustomerModal = ({ closeFunction, open }: IProps) => {
  const transitions = useTransition(open, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });
  const { setToastStatus, handleCloseToast } = useToast();

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
                <ModalHead closeFunction={closeFunction} title="New Customer" />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid columns="1fr" gap="0.5rem" padding="1rem">
                    <Input
                      startAdornment={<MdSubtitles />}
                      errors={errors}
                      label="Customer First Name"
                      {...register("first_name", { required: "Required" })}
                    />
                    <Input
                      startAdornment={<MdSubtitles />}
                      errors={errors}
                      label="Customer Last Name"
                      {...register("last_name", { required: "Required" })}
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

                    <Input
                      startAdornment={<HiOutlineMail />}
                      errors={errors}
                      label="Customer Email Address"
                      {...register("email")}
                    />
                  </Grid>
                  <ModalTail
                    btnText="Create new Customer"
                    closeFunction={() => closeFunction()}
                    successCb={() => {}}
                    btnType="submit"
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

export default AddCustomerModal;
const AnimatedDialogContent = styled(animated(DialogContent))`
  min-width: 300px;
  width: 300px;
  background-color: ${(props) => props.theme.subtleBackground};
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    min-width: 400px;
  }
`;

const AnimatedDialogOverlay = animated(DialogOverlay);

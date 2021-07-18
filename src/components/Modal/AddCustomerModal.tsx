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
import ReactModal from "react-modal";
import ModalHead from "../reusable/ModalHead";
import { FlexWrapper } from "../StyledComponents/Flex";
import Grid from "../StyledComponents/Grid";

interface IProps {
  closeFunction: () => void;
  isOpen: boolean;
}
const AddCustomerModal = ({ closeFunction, isOpen }: IProps) => {
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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeFunction}
      closeTimeoutMS={200}
      className="customer-modal modal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <ModalHead closeFunction={closeFunction} title="New Customer" />
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
    </ReactModal>
  );
};

export default AddCustomerModal;
const Body = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;

  ${FlexWrapper} {
    border-top: ${(props) => props.theme.border};
  }
`;

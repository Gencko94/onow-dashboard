import styled from "styled-components";
import ModalHead from "../../../Modal/ModalHead";
import ModalTail from "../../../Modal/ModalTail";
import { SubmitHandler } from "react-hook-form";
import Input from "../../../reusable/Input/Input";
import Grid from "../../../StyledComponents/Grid";
import { useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";

import { RiHandCoinLine } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { OPTION_VALUE } from "../../../../interfaces/products/products";
import { NEW_OPTION_VALUE } from "../../../../interfaces/products/create-new-product";

import { animated, useTransition } from "@react-spring/web";
import { DialogContent, DialogOverlay } from "@reach/dialog";
// const selectTypes = [
//   { value: "single", label: "Single Select" },
//   { value: "multiple", label: "Multiple Select" },
// ];
// const requiredOptions = [
//   { value: false, label: "No" },
//   { value: true, label: "Yes" },
// ];
// const modalStyles = {
//   content: {
//     inset: "240px",
//     border: "none",
//     boxShadow: "0px 4px 7px 2px rgb(213,213,213)",
//   },
// };
interface ModalProps {
  /**
   * Function to execute when the confirm button is clicked
   */
  closeFunction: () => void;
  /**
   * The Close Function
   */
  successFunction: (data: NEW_OPTION_VALUE | OPTION_VALUE) => void;

  /**
   * Boolean controlling the modal state
   */
  isOpen: boolean;

  /**
   * Success button loading state
   */
  isLoading?: boolean;
  defaultValues?: OPTION_VALUE;
  title: string;
}

const NewOptionValueModal = ({
  closeFunction,
  isOpen,
  title,
  successFunction,
  defaultValues,
  isLoading,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NEW_OPTION_VALUE | OPTION_VALUE>({
    shouldUnregister: true,
    defaultValues: {
      id: defaultValues?.id,
      name: defaultValues?.name,
      sku: defaultValues?.sku,
      price: defaultValues?.price,
      quantity: defaultValues?.quantity,
    },
  });
  const onSubmit: SubmitHandler<NEW_OPTION_VALUE | OPTION_VALUE> = (data) => {
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
                    <Input
                      startAdornment={<MdSubtitles />}
                      errors={errors}
                      label="Value Name English"
                      {...register("name.en", { required: "Required" })}
                    />
                    <Input
                      startAdornment={<MdSubtitles />}
                      errors={errors}
                      label="Value Name Arabic"
                      {...register("name.ar", { required: "Required" })}
                    />
                    <Input
                      errors={errors}
                      startAdornment={<IoPricetagsOutline />}
                      label="Price"
                      endAdornment="KD"
                      desc="Leave empty to disable"
                      {...register("price")}
                    />
                    <Input
                      errors={errors}
                      startAdornment={<RiHandCoinLine />}
                      label="Stock Quantity"
                      desc="Leave empty for unlimited"
                      {...register("quantity")}
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

export default NewOptionValueModal;
const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = styled(animated(DialogContent))`
  min-width: 300px;
  width: 300px;

  background-color: ${(props) => props.theme.subtleBackground};
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    min-width: 400px;
  }
`;

import styled from "styled-components";
import ModalHead from "../../../Modal/ModalHead";
import ModalTail from "../../../reusable/ModalTail";
import { SubmitHandler } from "react-hook-form";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Grid from "../../../StyledComponents/Grid";
import { useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";

import { RiHandCoinLine } from "react-icons/ri";
import PrefixedIconedInput from "../../../reusable/Inputs/PrefixedIconedInput";
import { IoPricetagsOutline } from "react-icons/io5";
import { OPTION_VALUE } from "../../../../interfaces/products/products";
import { NEW_OPTION_VALUE } from "../../../../interfaces/products/create-new-product";
import { up } from "../../../../utils/themes";
import { ModalWrapper } from "../../../Modal/ModalWrapper";
const selectTypes = [
  { value: "single", label: "Single Select" },
  { value: "multiple", label: "Multiple Select" },
];
const requiredOptions = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];
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
  return (
    <Modal>
      <ModalHead closeFunction={closeFunction} title={title} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Grid cols="minmax(200px,1fr)" gap="0.5rem">
            <IconedInput
              Icon={MdSubtitles}
              errors={errors?.name?.en}
              name={`name.en`}
              register={register}
              label="Value Name English"
              required
              requiredMessage="Required"
            />
            <IconedInput
              Icon={MdSubtitles}
              errors={errors?.name?.ar}
              name={`name.ar`}
              register={register}
              label="Value Name Arabic"
              requiredMessage="Required"
              required
            />
            <PrefixedIconedInput
              errors={errors?.price}
              Icon={IoPricetagsOutline}
              name={`price`}
              register={register}
              label="Price"
              prefix="KD"
              desc="Leave empty to disable"
            />
            <IconedInput
              errors={errors?.quantity}
              Icon={RiHandCoinLine}
              name={`quantity`}
              register={register}
              label="Stock Quantity"
              desc="Leave empty for unlimited"
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

export default NewOptionValueModal;
const Modal = styled(ModalWrapper)(
  ({ theme: { breakpoints, shadow, accent1 } }) => `
  position: fixed;
  z-index: 20;
  inset:200px 20px;
  position:fixed;
  min-width:300px;
  border:none;
  outline:none;
  z-index:20;
  background-color:${accent1};
  ${up(breakpoints.md)}{
    inset:180px 250px;
  }
  ${up(breakpoints.lg)}{
    inset:180px 350px;
  }
  ${up(breakpoints.xl)}{
    inset:180px 600px;
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

import styled from "styled-components";
import ReactModal from "react-modal";
import ModalHead from "../../../reusable/ModalHead";
import ModalTail from "../../../reusable/ModalTail";
import { FlexWrapper } from "../../../StyledComponents/Flex";
import { Controller, SubmitHandler } from "react-hook-form";
import IconedInput from "../../../reusable/Inputs/IconedInput";
import Grid from "../../../StyledComponents/Grid";
import { useForm } from "react-hook-form";
import { MdSubtitles } from "react-icons/md";
import Select from "../../../reusable/Select";
import IconedNumberInput from "../../../reusable/IconedNumberInput";
import { RiHandCoinLine } from "react-icons/ri";
import PrefixedIconedInput from "../../../reusable/Inputs/PrefixedIconedInput";
import { IoPricetagsOutline } from "react-icons/io5";
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
  successFunction: (data: NEW_OPTION_VALUE) => void;

  /**
   * Boolean controlling the modal state
   */
  isOpen: boolean;
  /**
   * Custom styles for the modal
   */
  styles?: ReactModal.Styles;
  /**
   * Success button loading state
   */
  isLoading?: boolean;
}

type NEW_OPTION_VALUE = {
  name: {
    [key: string]: string;
  };
  price: string;
  qty: number;
  sku: string;
};
const NewOptionValueModal = ({
  closeFunction,
  isOpen,

  styles,
  successFunction,

  isLoading,
}: ModalProps) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NEW_OPTION_VALUE>({ shouldUnregister: true });
  const onSubmit: SubmitHandler<NEW_OPTION_VALUE> = (data) => {
    successFunction(data);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeFunction}
      closeTimeoutMS={200}
      className="new-option-value-modal modal"
    >
      <form id="1" onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <ModalHead closeFunction={closeFunction} title="New Option Value" />
          <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0.5rem" p={4}>
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
              errors={errors?.qty}
              Icon={RiHandCoinLine}
              name={`qty`}
              register={register}
              label="Stock Quantity"
              desc="Leave empty for unlimited"
            />
          </Grid>
          <ModalTail
            btnType="submit"
            btnText={"Save"}
            // successCb={() => successFunction(watch())}
            successCb={() => {}}
            closeFunction={closeFunction}
            isLoading={isLoading}
          />
        </Body>
      </form>
    </ReactModal>
  );
};

export default NewOptionValueModal;

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

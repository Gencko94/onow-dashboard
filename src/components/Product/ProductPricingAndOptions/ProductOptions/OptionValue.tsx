import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { OPTION_VALUE } from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import { deleteProductOptionValue } from "../../../../utils/queries";
import Button from "../../../reusable/Button";

import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";

interface IProps {
  index: number;
  parentIndex: number;
  value: OPTION_VALUE;
  removeValue: (index?: number | number[] | undefined) => void;
}

const OptionValue = ({ index, parentIndex, removeValue, value }: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const { mutateAsync: deleteOptionValueMutation, reset } = useMutation(
    deleteProductOptionValue,
    {
      onSuccess: () => {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Option Value Deleted Successfully",
          type: "success",
        });
      },
      onError: (error) => {
        const { responseError } = extractError(error);
        if (responseError) {
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
    }
  );
  const handleDeleteOption = async () => {
    // await deleteOptionValueMutation()
  };
  return (
    <Container>
      <Flex items="center" justify="space-between" margin="0 0 1rem 0">
        <Heading tag="h6" color="subheading">
          Value {index + 1}
        </Heading>
      </Flex>
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0.5rem">
        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name En
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.name.en}
          </Heading>
        </div>

        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name Ar
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.name.ar}
          </Heading>
        </div>

        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Price
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.price}
          </Heading>
        </div>

        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Qty
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.quantity ?? "-"}
          </Heading>
        </div>
      </Grid>
      <Flex margin="1rem 0 0 0 " justify="center">
        <Button padding="0.25rem" bg="blue" withTransition>
          Edit
        </Button>
        <Button
          margin="0 0.5rem"
          padding="0.25rem"
          bg="danger"
          withTransition
          onClick={() => {
            setConfirmationModalStatus?.({
              open: true,
              closeCb: handleCloseConfirmationModal!,
              desc: "Are you sure you want to delete this option",
              successCb: () => {
                handleDeleteOption();
              },
              title: "Delete Product Option",
            });
          }}
        >
          Remove
        </Button>
      </Flex>
    </Container>
  );
};

export default OptionValue;
const Container = styled.div(
  ({ theme: { breakpoints, border, dangerRed, accent2 } }) => `
  background-color: ${accent2};
  padding: 0.75rem;
  border: ${border};
  border-radius: 6px;
  margin-bottom: 1rem;
  .delete {
    color: ${dangerRed};
  }
  `
);

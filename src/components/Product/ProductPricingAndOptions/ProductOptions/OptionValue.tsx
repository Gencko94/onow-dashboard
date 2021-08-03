import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useMutation } from "react-query";

import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { OPTION_VALUE } from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import { deleteProductOptionValue } from "../../../../utils/queries/productQueries";
import { up } from "../../../../utils/themes";
import Button from "../../../reusable/Button";

import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";

interface IProps {
  index: number;
  parentIndex: number;
  value: OPTION_VALUE;
  handleDeleteValue: (id: number) => void;
  setOptionValueModalStatus: Dispatch<
    SetStateAction<{ open: boolean; type: "new" | "edit"; editIndex?: number }>
  >;
}

const OptionValue = ({
  index,
  parentIndex,
  handleDeleteValue,
  setOptionValueModalStatus,
  value,
}: IProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

  return (
    <Container>
      <div className="head">
        <Flex items="center" justify="space-between">
          <Heading tag="h6" color="primary">
            Value {index + 1}
          </Heading>
          <Flex justify="center" items="center">
            <Button
              iconSize={25}
              Icon={AiFillEdit}
              padding="0.5rem"
              bg="blue"
              withTransition
              onClick={() => {
                setOptionValueModalStatus({
                  open: true,
                  type: "edit",
                  editIndex: index,
                });
              }}
            ></Button>
            <Button
              iconSize={25}
              margin="0 0.5rem"
              padding="0.5rem"
              bg="danger"
              Icon={AiFillDelete}
              withTransition
              onClick={() => {
                setConfirmationModalStatus?.({
                  open: true,
                  closeCb: handleCloseConfirmationModal!,
                  desc: "Are you sure you want to delete this Value ?",
                  successCb: () => {
                    handleDeleteValue(value.id);
                  },
                  title: "Delete Option Value",
                });
              }}
            ></Button>
          </Flex>
        </Flex>
      </div>
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0">
        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name En
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.name.en}
          </Heading>
        </div>

        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name Ar
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.name.ar}
          </Heading>
        </div>

        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Price
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.price}
          </Heading>
        </div>

        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Qty
          </Heading>
          <Heading tag="h6" color="subheading">
            {value.quantity ?? "-"}
          </Heading>
        </div>
      </Grid>
    </Container>
  );
};

export default OptionValue;
const Container = styled.div(
  ({ theme: { breakpoints, border, dangerRed, accent2, accent1 } }) => `
  background-color: ${accent1};
  border: ${border};
  border-radius: 6px;
  margin-bottom: 1rem;
  .delete {
    color: ${dangerRed};
  }
  .head {
    border-bottom: ${border};
    padding:0.75rem;
    background-color:${accent2};
  }
  .field {
    padding:0.75rem;
    border-right: ${border};
    border-bottom: ${border};
  }
  ${up(breakpoints.md)}{
   
    .head , .field {
      padding:1rem;
    }
  }
  `
);

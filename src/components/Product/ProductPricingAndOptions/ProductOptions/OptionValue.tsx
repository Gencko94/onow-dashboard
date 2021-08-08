import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import { OPTION_VALUE } from "../../../../interfaces/products/products";
import { up } from "../../../../utils/themes";
import Button from "../../../reusable/Button";
import IconWrapper from "../../../reusable/Icon";
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
              color="blue"
              withTransition
              onClick={() => {
                setOptionValueModalStatus({
                  open: true,
                  type: "edit",
                  editIndex: index,
                });
              }}
            >
              <IconWrapper Icon={AiFillEdit} />
            </Button>
            <Button
              margin="0 0.5rem"
              color="danger"
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
            >
              <IconWrapper Icon={AiFillDelete} />
            </Button>
          </Flex>
        </Flex>
      </div>
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0">
        <div className="field">
          <div className="field-head">
            <Heading tag="h6" color="heading" weight="bold">
              Name En
            </Heading>
          </div>
          <div className="field-body">
            <Heading tag="h6" color="subheading">
              {value.name.en}
            </Heading>
          </div>
        </div>

        <div className="field">
          <div className="field-head">
            <Heading tag="h6" color="heading" weight="bold">
              Name Ar
            </Heading>
          </div>
          <div className="field-body">
            <Heading tag="h6" color="subheading">
              {value.name.ar}
            </Heading>
          </div>
        </div>

        <div className="field">
          <div className="field-head">
            <Heading tag="h6" color="heading" weight="bold">
              Price
            </Heading>
          </div>
          <div className="field-body">
            <Heading tag="h6" color="subheading">
              {value.price}
            </Heading>
          </div>
        </div>

        <div className="field">
          <div className="field-head">
            <Heading tag="h6" color="heading" weight="bold">
              Qty
            </Heading>
          </div>
          <div className="field-body">
            <Heading tag="h6" color="subheading">
              {value.quantity ?? "-"}
            </Heading>
          </div>
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
   
    border-right: ${border};
    border-bottom: ${border};
  }
  ${up(breakpoints.md)}{
   
    .head  {
      padding:1rem;
    }
  }
  `
);

import { Dispatch, SetStateAction } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal/useConfirmationModal";
import { OPTION_VALUE } from "../../../../interfaces/products/products";

import Button from "../../../reusable/Button";
import IconWrapper from "../../../reusable/Icon";
import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";
import Paragraph from "../../../StyledComponents/Paragraph";

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
      <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="0">
        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Name En
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{value.name.en}</Paragraph>
          </div>
        </div>

        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Name Ar
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{value.name.ar}</Paragraph>
          </div>
        </div>

        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Price
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{value.price}</Paragraph>
          </div>
        </div>

        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Qty
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{value.quantity ?? "-"}</Paragraph>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default OptionValue;
const Container = styled.div`
  background-color: ${(props) => props.theme.accent1};
  border: ${(props) => props.theme.border};
  border-radius: 6px;
  margin-bottom: 1rem;
  .delete {
    color: ${(props) => props.theme.dangerRed};
  }
  .head {
    border-bottom: ${(props) => props.theme.border};
    padding: 0.75rem;
    background-color: ${(props) => props.theme.accent2};
  }
  .field {
    border-right: ${(props) => props.theme.border};
    border-bottom: ${(props) => props.theme.border};
  }
  @media ${(props) => props.theme.breakpoints.mdAndLarger} {
    .head {
      padding: 1rem;
    }
  }
`;

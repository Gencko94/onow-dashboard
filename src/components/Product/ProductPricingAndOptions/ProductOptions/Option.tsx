import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";

import { useMutation } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { PRODUCT_OPTION } from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import { deleteProductOption } from "../../../../utils/queries/productQueries";

import { up } from "../../../../utils/themes";

import Button from "../../../reusable/Button";
import EmptyTable from "../../../reusable/EmptyTable";

import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";

import NewOptionValueModal from "./NewOptionValueModal";
import OptionValue from "./OptionValue";

interface IProps {
  option: PRODUCT_OPTION;
  index: number;
  removeOption: (id: number) => void;
  productId: number;
  setOptionModalStatus: Dispatch<
    SetStateAction<{ open: boolean; type: "new" | "edit"; editIndex?: number }>
  >;
}

const Option = ({
  option,
  index,
  removeOption,
  productId,
  setOptionModalStatus,
}: IProps) => {
  const [newOptionValueOpen, setNewOptionValueModalOpen] = useState(false);

  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();

  const { mutateAsync: deleteOptionMutation, reset } = useMutation(
    deleteProductOption,
    {
      onSuccess: (data, { optionId }) => {
        // Show Success Message
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Option Deleted Successfully",
          type: "success",
        });
        // Remove it from Options Array
        removeOption(optionId);
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
            text: "Something went wrong",
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
    }
  );
  const {
    i18n: { language },
  } = useTranslation();
  const handleDeleteOption = async (optionId: number) => {
    handleCloseConfirmationModal?.();
    await deleteOptionMutation({ optionId, productId });
  };
  return (
    <Container>
      <div className="head">
        <Flex items="center" justify="space-between">
          <Heading tag="h5" weight="bold">
            Option {index + 1}
          </Heading>
          <Flex justify="center" items="center">
            <Button
              iconSize={25}
              Icon={AiFillEdit}
              padding="0.5rem"
              bg="blue"
              onClick={() => {
                setOptionModalStatus({
                  open: true,
                  type: "edit",
                  editIndex: index,
                });
              }}
              withTransition
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
                  desc: "Are you sure you want to delete this option ?",
                  successCb: () => {
                    handleDeleteOption(option.id);
                  },
                  title: "Delete Product Option",
                });
              }}
            ></Button>
          </Flex>
        </Flex>
      </div>
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap="0" margin="0 ">
        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name En
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.name?.en}
          </Heading>
        </div>
        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name Ar
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.name?.ar}
          </Heading>
        </div>
        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Select Type
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.select_type}
          </Heading>
        </div>
        <div className="field">
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Required
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.required ? "Yes" : "No"}
          </Heading>
        </div>
      </Grid>
      <div className="head">
        <Flex justify="space-between" items="center">
          <Heading tag="h5" weight="bold" color="primary">
            Option {index + 1} Values
          </Heading>
          <Button
            withRipple
            withTransition
            bg="primary"
            padding="0.25rem"
            onClick={() =>
              // append(
              //   { name: { ar: "", en: "" }, price: "", qty: 0, sku: "" },
              //   { shouldFocus: false }
              // )
              setNewOptionValueModalOpen(true)
            }
            textSize="0.9rem"
            Icon={BiPlus}
          >
            Add new Value
          </Button>
        </Flex>
      </div>
      {option.values.length === 0 && (
        <div className="empty">
          <EmptyTable
            text={`Add Values for ${option.name?.[language]}`}
            height="150px"
            withButton
            btnText="Add New Option Value"
            cb={() => {
              setNewOptionValueModalOpen(true);
            }}
          />
        </div>
      )}
      {option.values?.length > 0 && (
        <div className="values">
          {option.values?.map((value, childIndex: number) => {
            return (
              <OptionValue
                value={value}
                key={value.id}
                index={childIndex}
                parentIndex={index}
                removeValue={() => {}} // setRemove Function
              />
            );
          })}
        </div>
      )}

      <NewOptionValueModal
        isOpen={newOptionValueOpen}
        closeFunction={() => {
          setNewOptionValueModalOpen(false);
        }}
        successFunction={(data) => {
          // append({
          //   ...data,
          // });
          setNewOptionValueModalOpen(false);
        }}
      />
    </Container>
  );
};

export default Option;
const Container = styled.div(
  ({ theme: { breakpoints, border, dangerRed, accent1, accent2 } }) => `
  border: ${border};
  border-radius: 6px;
  margin-bottom: 1rem ;
  background-color:${accent1};
  .values {
    padding: 0.5rem;
    background-color:${accent1};
  }
  .head {
    border-bottom: ${border};
    padding:0.75rem;
    background-color:${accent2};
  }
  .field {
    text-align:center;
    padding:0.75rem;
    border-right: ${border};
    border-bottom: ${border};
  }
  .empty {    
    background-color:${accent1};
  }
  ${up(breakpoints.md)}{
    .values {
      padding: 1rem;
    }
    .head , .field {
      padding:1rem;
    }
  }
  `
);

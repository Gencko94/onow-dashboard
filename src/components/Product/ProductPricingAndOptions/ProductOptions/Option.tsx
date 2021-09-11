import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { NEW_OPTION_VALUE } from "../../../../interfaces/products/create-new-product";
import {
  OPTION_VALUE,
  PRODUCT_OPTION,
} from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import {
  addProductOptionValue,
  deleteProductOptionValue,
  editProductOptionValue,
} from "../../../../utils/queries/productQueries";
import { up } from "../../../../utils/themes";
import Button from "../../../reusable/Button";
import EmptyTable from "../../../reusable/EmptyTable";
import IconWrapper from "../../../reusable/Icon";
import Spacer from "../../../reusable/Spacer";
import Flex from "../../../StyledComponents/Flex";
import Grid from "../../../StyledComponents/Grid";
import Heading from "../../../StyledComponents/Heading";
import Paragraph from "../../../StyledComponents/Paragraph";
import NewOptionValueModal from "./NewOptionValueModal";
import OptionValue from "./OptionValue";

interface IProps {
  option: PRODUCT_OPTION;
  index: number;
  handleDeleteOption: (id: number) => void;
  productId: number;
  setOptionModalStatus: Dispatch<
    SetStateAction<{ open: boolean; type: "new" | "edit"; editIndex?: number }>
  >;
}

const Option = ({
  option,
  index,
  productId,
  setOptionModalStatus,
  handleDeleteOption,
}: IProps) => {
  const [optionValueModalStatus, setOptionValueModalStatus] = useState<{
    open: boolean;
    type: "new" | "edit";
    editIndex?: number;
  }>({
    open: false,
    type: "edit",
  });
  const [values, setValues] = useState<OPTION_VALUE[]>(option.values);

  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();

  const {
    i18n: { language },
  } = useTranslation();
  const {
    mutateAsync: addMutation,
    reset: resetAdd,
    isLoading: addLoading,
  } = useMutation(addProductOptionValue, {
    onSuccess: (data) => {
      // Show Success message
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Option Added Successfully",
        type: "success",
      });
      // Add it to Options Array
      setValues((prev) => [...prev, data]);
    },
    onError: (error) => {
      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            resetAdd();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            resetAdd();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    },
  });
  // Edit Mutation
  const {
    mutateAsync: editMutation,
    reset: resetEdit,
    isLoading: editLoading,
  } = useMutation(editProductOptionValue, {
    onSuccess: (newValue, { value: oldValue }) => {
      // Show Success message
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Option Added Successfully",
        type: "success",
      });
      // Edit it from Options Array
      // Find the position of the old option in the options array.
      const oldIndex = values.findIndex((i) => i.id === oldValue.id);
      if (typeof oldIndex !== "undefined") {
        setValues((prev) => {
          const valuesCopy = [...prev];
          valuesCopy[oldIndex] = newValue;
          return valuesCopy;
        });
      }
    },
    onError: (error) => {
      const { responseError } = extractError(error);
      if (responseError) {
      } else {
        setToastStatus?.({
          fn: () => {
            resetEdit();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    },
  });
  const { mutateAsync: deleteOptionMutation, reset } = useMutation(
    deleteProductOptionValue,
    {
      onSuccess: (_, { valueId }) => {
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
        setValues((prev) => {
          return prev.filter((i) => i.id !== valueId);
        });
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
  const handleAddValue = async (value: NEW_OPTION_VALUE) => {
    await addMutation({ productId, optionId: option.id, value });
    setOptionValueModalStatus((prev) => ({ ...prev, open: false }));
  };
  const handleEditValue = async (value: OPTION_VALUE) => {
    await editMutation({ productId, optionId: option.id, value });
    setOptionValueModalStatus((prev) => ({ ...prev, open: false }));
  };
  const handleDeleteValue = async (valueId: number) => {
    handleCloseConfirmationModal?.();
    await deleteOptionMutation({ valueId, productId, optionId: option.id });
  };
  return (
    <Container>
      <div className="head">
        <Flex items="center" justify="space-between">
          <Heading tag="h5" type="small-title">
            Option {index + 1}
          </Heading>
          <Flex justify="center" items="center">
            <Button
              color="blue"
              onClick={() => {
                setOptionModalStatus({
                  open: true,
                  type: "edit",
                  editIndex: index,
                });
              }}
              withTransition
            >
              <IconWrapper Icon={AiFillEdit} />
            </Button>
            <Spacer size={10} />
            <Button
              color="danger"
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
            >
              <IconWrapper Icon={AiFillDelete} />
            </Button>
          </Flex>
        </Flex>
      </div>
      <Grid columns="repeat(auto-fit,minmax(200px,1fr))" gap="0" margin="0 ">
        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Name En
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{option.name?.en}</Paragraph>
          </div>
        </div>
        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Name Ar
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{option.name?.ar}</Paragraph>
          </div>
        </div>
        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Select Type
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{option.select_type}</Paragraph>
          </div>
        </div>
        <div className="field">
          <div className="field-head">
            <Heading tag="h6" type="small-title">
              Required
            </Heading>
          </div>
          <div className="field-body">
            <Paragraph>{option.required ? "Yes" : "No"}</Paragraph>
          </div>
        </div>
      </Grid>
      <div className="head">
        <Flex justify="space-between" items="center">
          <Heading tag="h5" type="small-title">
            Option {index + 1} Values
          </Heading>
          <Button
            withTransition
            color="primary"
            onClick={() =>
              setOptionValueModalStatus({ open: true, type: "new" })
            }
          >
            Add new Value
          </Button>
        </Flex>
      </div>
      {values.length === 0 && (
        <div className="empty">
          <EmptyTable
            text={`Add Values for ${option.name?.[language]}`}
            height="150px"
            withButton
            btnText="Add New Option Value"
            cb={() => {
              setOptionValueModalStatus({ open: true, type: "new" });
            }}
          />
        </div>
      )}
      {values?.length > 0 && (
        <div className="values">
          {values?.map((value, childIndex: number) => {
            return (
              <OptionValue
                value={value}
                setOptionValueModalStatus={setOptionValueModalStatus}
                key={value.id}
                index={childIndex}
                parentIndex={index}
                handleDeleteValue={handleDeleteValue}
              />
            );
          })}
        </div>
      )}

      <NewOptionValueModal
        title={
          optionValueModalStatus.type === "edit" ? "Edit Value" : "New Value"
        }
        isLoading={
          optionValueModalStatus.type === "edit" ? editLoading : addLoading
        }
        isOpen={optionValueModalStatus.open}
        defaultValues={
          optionValueModalStatus.type === "edit"
            ? values[optionValueModalStatus.editIndex!]
            : undefined
        }
        closeFunction={() => {
          setOptionValueModalStatus((prev) => ({ ...prev, open: false }));
        }}
        successFunction={(vals) => {
          if (optionValueModalStatus.type === "edit") {
            handleEditValue(vals as OPTION_VALUE);
          } else if (optionValueModalStatus.type === "new") {
            handleAddValue(vals as NEW_OPTION_VALUE);
          }
        }}
      />
    </Container>
  );
};

export default Option;
const Container = styled.div(
  ({
    theme: {
      breakpoints,
      border,
      dangerRed,
      background,
      subtleBackground,
      accent2,
    },
  }) => `
  border: ${border};
  border-radius: 6px;
  margin-bottom: 1rem ;
  background-color:${background};
  .values {
    padding: 0.5rem;
    background-color:${subtleBackground};
  }
  .head {
    border-bottom: ${border};
    padding:0.75rem;
    background-color:${subtleBackground};
  }
  .field {
    text-align:center;
    border-right: ${border};
    border-bottom: ${border};
  }
  .field-head {
    border-bottom: ${border};
    padding:0.5rem;
  }
  .field-body {
    padding:0.5rem;

  }
  .empty {    
    background-color:${background};
  }
  ${up(breakpoints.md)}{
    .values {
      padding: 1rem;
    }
    .head{
      padding:1rem;
    }
    .field-head, .field-body {
      padding:0.75rem 
    }
  }
  `
);

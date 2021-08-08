import React, { lazy, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { PRODUCT_OPTION } from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import {
  addProductOption,
  deleteProductOption,
  editProductOption,
} from "../../../../utils/queries/productQueries";

import { up } from "../../../../utils/themes";
import Modal from "../../../Modal/Modal";

import Button from "../../../reusable/Button";
import EmptyTable from "../../../reusable/EmptyTable";
import Flex from "../../../StyledComponents/Flex";
import Heading from "../../../StyledComponents/Heading";
import Hr from "../../../StyledComponents/Hr";
import { NEW_OPTION } from "./NewOptionModal";
import Option from "./Option";
const NewOptionModal = lazy(() => import("./NewOptionModal"));

interface OptionsListProps {
  productOptions: PRODUCT_OPTION[];
  productId: number;
}

const OptionsList = ({ productOptions, productId }: OptionsListProps) => {
  const [options, setOptions] = useState(productOptions);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();

  const [optionModalStatus, setOptionModalStatus] = useState<{
    open: boolean;
    type: "new" | "edit";
    editIndex?: number;
  }>({
    open: false,
    type: "edit",
  });
  const {
    mutateAsync: addMutation,
    reset: resetAdd,
    isLoading: addLoading,
  } = useMutation(addProductOption, {
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
      setOptions((prev) => [...prev, data]);
    },
    onError: (error) => {
      const { responseError } = extractError(error);
      if (responseError) {
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
  } = useMutation(editProductOption, {
    onSuccess: (newOption, { option: oldOption }) => {
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
      const oldIndex = options.findIndex((i) => i.id === oldOption.id);
      if (typeof oldIndex !== "undefined") {
        setOptions((prev) => {
          const optionsCopy = [...prev];
          optionsCopy[oldIndex] = newOption;
          return optionsCopy;
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
    deleteProductOption,
    {
      onSuccess: (_, { optionId }) => {
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
        setOptions((prev) => {
          return prev.filter((i) => i.id !== optionId);
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
  const handleAddOption = async (option: NEW_OPTION) => {
    await addMutation({ option, productId });
    setOptionModalStatus((prev) => ({ ...prev, open: false }));
  };
  const handleEditOption = async (option: PRODUCT_OPTION) => {
    await editMutation({ option, productId });
    setOptionModalStatus((prev) => ({ ...prev, open: false }));
  };
  const handleDeleteOption = async (optionId: number) => {
    handleCloseConfirmationModal?.();
    await deleteOptionMutation({ optionId, productId });
  };

  return (
    <Container>
      <div className="head">
        <Flex justify="space-between" items="center">
          <Heading color="heading" tag="h5" weight="bold">
            Options
          </Heading>
          <Button
            withTransition
            color="green"
            onClick={() => {
              setOptionModalStatus({ open: true, type: "new" });
            }}
          >
            Add Another Option
          </Button>
        </Flex>
      </div>
      {/* If No Options Show this */}
      {options.length === 0 && (
        <EmptyTable
          text="You have not added any options"
          height="200px"
          withButton
          btnText="Add new Option"
          cb={() => {
            setOptionModalStatus({ open: true, type: "new" });
          }}
        />
      )}
      {options.length > 0 && (
        <>
          <div className="list">
            {options.map((option, index) => {
              return (
                <React.Fragment key={option.id}>
                  <Option
                    productId={productId}
                    option={option}
                    index={index}
                    setOptionModalStatus={setOptionModalStatus}
                    handleDeleteOption={handleDeleteOption}
                  />
                  {index !== options.length - 1 && <Hr m="2.5" />}
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
      <Modal
        isOpen={optionModalStatus.open}
        closeFunction={() => {
          setOptionModalStatus((prev) => ({ ...prev, open: false }));
        }}
      >
        <CSSTransition
          classNames="product-option-modal"
          timeout={200}
          unmountOnExit
          in={optionModalStatus.open}
        >
          <NewOptionModal
            title={
              optionModalStatus.type === "edit" ? "Edit Option" : "New Option"
            }
            isOpen={optionModalStatus.open}
            isLoading={
              optionModalStatus.type === "edit" ? editLoading : addLoading
            }
            closeFunction={() => {
              setOptionModalStatus((prev) => ({ ...prev, open: false }));
            }}
            defaultValues={
              optionModalStatus.type === "edit"
                ? options[optionModalStatus.editIndex!]
                : undefined
            }
            successFunction={(vals) => {
              if (optionModalStatus.type === "edit") {
                handleEditOption(vals as PRODUCT_OPTION);
              } else if (optionModalStatus.type === "new") {
                handleAddOption(vals as NEW_OPTION);
              }
            }}
          />
        </CSSTransition>
      </Modal>
    </Container>
  );
};

export default OptionsList;
const Container = styled.div(
  ({ theme: { border, breakpoints, accent1 } }) => `
  margin-top:1rem;
  border: ${border};
  .head {
    background-color:${accent1};
    border-bottom: ${border};
    padding: 0.75rem;
  }
  .list {
    padding: 0.75rem;
  };
  ${up(breakpoints.md)} {
    .head ,.list {
      padding:1rem;
    }
  }

`
);

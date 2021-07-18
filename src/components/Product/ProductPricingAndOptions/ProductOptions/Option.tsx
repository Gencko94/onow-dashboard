import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { useMutation } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { PRODUCT_OPTION } from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import { deleteProductOption } from "../../../../utils/queries";

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
  removeOption: (index?: number | number[] | undefined) => void;
}

const Option = ({ option, index, removeOption }: IProps) => {
  const [newOptionValueOpen, setNewOptionValueModalOpen] = useState(false);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();
  const { mutateAsync: deleteOptionMutation, reset } = useMutation(
    deleteProductOption,
    {
      onSuccess: () => {
        setToastStatus?.({
          fn: () => {
            handleCloseToast?.();
          },
          open: true,
          text: "Option Deleted Successfully",
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
  const {
    i18n: { language },
  } = useTranslation();
  const handleDeleteOption = async () => {
    // await deleteOptionMutation()
  };
  return (
    <Container>
      <Flex items="center" justify="space-between" margin="0 0 1rem 0">
        <Heading tag="h5" color="primary">
          Option {index + 1}
        </Heading>
        <button
          type="button"
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
          className="delete"
        >
          <TiDelete size={30} />
        </button>
      </Flex>
      <Grid
        cols="repeat(auto-fit,minmax(200px,1fr))"
        gap="0.5rem"
        margin="1rem 0 "
      >
        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name En
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.name?.en}
          </Heading>
        </div>
        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Name Ar
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.name?.ar}
          </Heading>
        </div>
        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Select Type
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.select_type}
          </Heading>
        </div>
        <div>
          <Heading tag="h6" color="heading" weight="semibold" mb="0.25rem">
            Required
          </Heading>
          <Heading tag="h6" color="subheading">
            {option.required ? "Yes" : "No"}
          </Heading>
        </div>
      </Grid>
      <Heading tag="h5" color="primary" margin="2rem 0 ">
        Options Values
      </Heading>
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
          <Flex items="center" justify="center">
            <Button
              withRipple
              withTransition
              text="Add New Value"
              bg="primary"
              padding="0.5rem"
              onClick={() =>
                // append(
                //   { name: { ar: "", en: "" }, price: "", qty: 0, sku: "" },
                //   { shouldFocus: false }
                // )
                setNewOptionValueModalOpen(true)
              }
              textSize="0.9rem"
              Icon={BiPlus}
            />
          </Flex>
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
  ({ theme: { breakpoints, border, dangerRed, accent1 } }) => `
  border: ${border};
  border-radius: 6px;
  padding: 0.5rem 1rem 1rem 1rem;
  margin: 1rem 0;
  text-align:center;
  .delete {
    color: ${dangerRed};
  }
  
  .values {
    padding: 0;
  }
  .empty {
    border:${border};
    border-radius:6px;
    background-color:${accent1};
    padding: 1rem 0;
  }
  @media ${breakpoints.md}{
    .values {
      padding: 0 1rem;
    }
  }
  `
);

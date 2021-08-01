import { useCallback } from "react";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "react-query";
import styled from "styled-components";
import useConfirmationModal from "../../../../hooks/useConfirmationModal";
import useToast from "../../../../hooks/useToast";
import { PRODUCT_OPTION } from "../../../../interfaces/products/products";
import extractError from "../../../../utils/extractError";
import { addProductOption } from "../../../../utils/queries";
import { up } from "../../../../utils/themes";

import Button from "../../../reusable/Button";
import EmptyTable from "../../../reusable/EmptyTable";
import Flex from "../../../StyledComponents/Flex";
import Heading from "../../../StyledComponents/Heading";
import NewOptionModal from "./NewOptionModal";
import Option from "./Option";

interface OptionsListProps {
  productOptions: PRODUCT_OPTION[];
}

const OptionsList = ({ productOptions }: OptionsListProps) => {
  const [options, setOptions] = useState(productOptions);
  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();
  const { setToastStatus, handleCloseToast } = useToast();

  const [newOptionModalOpen, setNewOptionModalOpen] = useState(false);
  const { mutateAsync: addMutation, reset } = useMutation(addProductOption, {
    onSuccess: () => {
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Option Added Successfully",
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
  });
  const append = useCallback(async (option: PRODUCT_OPTION) => {
    // await addMutation(option);
    setOptions((prev) => [...prev, option]);
  }, []);
  return (
    <Container>
      <div className="head">
        <Flex justify="space-between" items="center">
          <Heading color="heading" tag="h5" weight="bold">
            Options
          </Heading>
          <Button
            withRipple
            withTransition
            bg="green"
            padding="0.25rem 0.5rem"
            onClick={() => {
              setNewOptionModalOpen(true);
            }}
            textSize="0.9rem"
            Icon={BiPlus}
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
            // append({
            //   max_picks: 0,
            //   required: priceByOptions ? true : false,
            //   name: { ar: "", en: "" },
            //   select_type: "single",
            //   values: [
            //     {
            //       name: {
            //         ar: "",
            //         en: "",
            //       },
            //       price: "",
            //       qty: 0,
            //       sku: "",
            //     },
            //   ],
            // });
            setNewOptionModalOpen(true);
          }}
        />
      )}
      {options.length > 0 && (
        <>
          <div className="list">
            {options.map((option, index) => {
              return (
                <Option
                  key={option.id}
                  option={option}
                  index={index}
                  removeOption={() => {}} // Watch this
                />
              );
            })}
            <Flex items="center" justify="center" margin="1rem 0">
              <Button
                withRipple
                withTransition
                bg="green"
                padding="0.5rem"
                onClick={() => {
                  setNewOptionModalOpen(true);
                }}
                textSize="0.9rem"
                Icon={BiPlus}
              >
                Add Another Option
              </Button>
            </Flex>
          </div>
        </>
      )}
      <NewOptionModal
        isOpen={newOptionModalOpen}
        closeFunction={() => {
          setNewOptionModalOpen(false);
        }}
        successFunction={(vals) => {
          console.log(vals);
          append({
            id: 432,
            required: vals.required,
            select_type: vals.select_type,
            name: vals.name,
            max_picks: undefined,
            values: [],
          });

          setNewOptionModalOpen(false);
        }}
      />
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

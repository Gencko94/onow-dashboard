import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { BiPlus } from "react-icons/bi";

import styled from "styled-components";

import Button from "../../../reusable/Button";
import EmptyTable from "../../../reusable/EmptyTable";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";
import Heading from "../../../StyledComponents/Heading";
import { secondTabProps } from "../CreateProductPricingAndOptions";

import Option from "./CreateProductOption";

const CreateProductOptionsList = ({
  priceFromVariationsEnabled,
}: {
  priceFromVariationsEnabled: boolean;
}) => {
  const { control, watch } = useFormContext<secondTabProps>();

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
  });
  const options = watch("options");
  const priceByOptions = watch("price_by_options");
  useEffect(() => {
    if (options?.length === 0) {
      append(
        {
          max_picks: 0,
          required: priceByOptions ? true : false,
          name: { ar: "", en: "" },
          select_type: "single",
          values: [
            {
              name: {
                ar: "",
                en: "",
              },
              price: "",
              qty: 0,
              sku: "",
            },
          ],
        },
        { shouldFocus: false }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Heading color="primary" tag="h5" mb="0.5rem" weight="semibold">
        Options :
      </Heading>
      {/* If No Options Show this */}
      {/* <EmptyTable
        text="You have not added any options"
        height="200px"
        withButton
        btnText="Add new Option"
        cb={() => {
          append({
            max_picks: 0,
            required: priceByOptions ? true : false,
            name: { ar: "", en: "" },
            select_type: "single",
            values: [
              {
                name: {
                  ar: "",
                  en: "",
                },
                price: "",
                qty: 0,
                sku: "",
              },
            ],
          });
        }}
      /> */}
      {fields.length > 0 && (
        <>
          <div className="list">
            {fields.map((field, index) => {
              return (
                <Option
                  key={field.id}
                  option={field}
                  index={index}
                  removeOption={remove}
                />
              );
            })}
            <Flex items="center" justify="center" margin="1rem 0">
              <Button
                withRipple
                withTransition
                text="Add Another Option"
                bg="green"
                padding="0.5rem"
                onClick={() =>
                  append(
                    {
                      required: false,
                      select_type: "single",
                      values: [
                        {
                          name: { ar: "", en: "" },
                          price: "",
                          qty: 0,
                          sku: "",
                        },
                      ],
                    },
                    { shouldFocus: false }
                  )
                }
                textSize="0.9rem"
                Icon={BiPlus}
              />
            </Flex>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProductOptionsList;

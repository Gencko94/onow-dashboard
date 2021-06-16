import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import styled from "styled-components";

import AddButton from "../../../reusable/AddButton";
import EmptyTable from "../../../reusable/EmptyTable";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";
import { secondTabProps } from "../CreateProductPricingAndOptions";

import Option from "./Option";

const Options = ({
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
    if (options.length === 0) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <h6 className="title">Product Options</h6>
      {/* If No Options Show this */}
      {fields.length === 0 && (
        <div className="no-variations-container">
          <EmptyTable
            height="100%"
            btnText="Add New Option"
            text="No Options were Added"
            withButton
            cb={() =>
              append({
                required: false,
                select_type: "single",
                values: [
                  { name: { ar: "", en: "" }, price: "", qty: 0, sku: "" },
                ],
              })
            }
          />
        </div>
      )}
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
            <Flex items="center" justify="center">
              <AddButton
                title="Add Another Option"
                cb={() =>
                  append({
                    required: false,
                    select_type: "single",
                    values: [
                      { name: { ar: "", en: "" }, price: "", qty: 0, sku: "" },
                    ],
                  })
                }
              />
            </Flex>
          </div>
        </>
      )}
    </Container>
  );
};

export default Options;
const Container = styled.div`
  padding: 1rem 0;
  .title {
    margin: 1rem 0;
    color: ${(props) => props.theme.mainColor};
  }
  .no-variations-container {
    background-color: ${(props) => props.theme.overlayColor};
    height: 200px;
    border: ${(props) => props.theme.border};
    border-radius: 6px;
  }
  .list {
    ${FlexWrapper} {
      margin: 1rem 0;
    }
  }
`;

import { useFieldArray, useFormContext } from "react-hook-form";

import styled from "styled-components";
import { NEW_PRODUCT_FORM_PROPS } from "../../../../interfaces/products/create-new-product";

import AddButton from "../../../reusable/AddButton";
import EmptyTable from "../../../reusable/EmptyTable";
import Flex, { FlexWrapper } from "../../../StyledComponents/Flex";

import Option from "./Option";

const Options = ({
  priceFromVariationsEnabled,
}: {
  priceFromVariationsEnabled: boolean;
}) => {
  const { control } = useFormContext<NEW_PRODUCT_FORM_PROPS>();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "variations", // unique name for your Field Array
  });

  return (
    <Container>
      <h6 className="title">Product Options</h6>
      {/* If No Options Show this */}
      {fields.length === 0 && (
        <div className="no-variations-container">
          <EmptyTable
            btnText="Add New Variation"
            text="No Options were Added"
            withButton
            cb={() => append({})}
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
              <AddButton title="Add Another Option" cb={() => append({})} />
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

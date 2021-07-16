import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

import styled from "styled-components";

import GithubInput from "../../reusable/Inputs/GithubInput";
import Heading from "../../StyledComponents/Heading";
import Hr from "../../StyledComponents/Hr";
import { secondTabProps } from "./CreateProductPricingAndOptions";

import Options from "./Options/Options";

const CreateProductOptions = () => {
  const { control, watch, setValue, clearErrors } =
    useFormContext<secondTabProps>();
  const priceFromVariationsEnabled = watch("price_by_options");
  const variationsEnabled = watch("options_enabled");
  useEffect(() => {
    if (!variationsEnabled) {
      clearErrors("options");
    }
  }, [variationsEnabled]);
  return (
    <div>
      <Heading color="primary" tag="h5" mb="1.5rem" weight="semibold">
        Product Options
      </Heading>

      <Controller
        name="options_enabled"
        control={control}
        render={({ field: { onChange, value } }) => (
          <GithubInput
            checked={value}
            onChange={(e) => {
              if (priceFromVariationsEnabled) {
                return;
              } else {
                onChange(e.target.checked);
                if (!e.target.checked) {
                  setValue("options", []);
                }
              }
            }}
            label="Enable Product Options"
            desc="Product Options are properties of the product like Size-Color-..."
          />
        )}
      />

      {variationsEnabled && (
        <>
          <Hr />
          <Options priceFromVariationsEnabled={priceFromVariationsEnabled} />
        </>
      )}
    </div>
  );
};

export default CreateProductOptions;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor } }) => `
    // .inputs-container {
    //     display: grid;
    //     grid-template-columns: 1fr;
    //     gap:1rem;
    // }
    // @media ${breakpoints.md}{
    //     .inputs-container {
           
    //         grid-template-columns: 1fr 1fr 1fr;
    //     }


    // }
    `
);

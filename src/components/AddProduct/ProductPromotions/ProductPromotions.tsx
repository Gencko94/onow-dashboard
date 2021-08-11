import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import Select from "../../reusable/Select";
import Grid from "../../StyledComponents/Grid";
import PrefixedIconedInput from "../../reusable/Inputs/PrefixedIconedInput";
import { IoPricetagsOutline } from "react-icons/io5";
import DateIconedInput from "../../reusable/Inputs/DateIconedInput";
import { NEW_PRODUCT_FORM_PROPS } from "../../../interfaces/products/create-new-product";

const promotionTypeOptions = [
  {
    label: "Promotion on Product Price",
    value: "product_price",
  },
  {
    label: "Promotion on Product Option",
    value: "option_price",
  },
];

const ProductPromotions = () => {
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext<NEW_PRODUCT_FORM_PROPS>();
  const {
    i18n: { language },
  } = useTranslation();
  const promotionType = watch("promotions.type");
  const values = watch("promotions.values_skus");
  const options = [
    {
      name: {
        ar: "المقاس",
        en: "Size",
      },
      max_picks: 4,
      required: true,
      select_type: "single",

      values: [
        {
          name: {
            ar: "صغير",
            en: "Small",
          },
          price: "2",
          qty: 1,

          sku: "f",
        },
        {
          name: {
            ar: "كبير",
            en: "Large",
          },
          price: "3",
          qty: 1,

          sku: "3",
        },
      ],
    },
  ];

  const formatOptionLabel = (data: any) => (
    <div>
      <span>{data.name[language]}</span>
    </div>
  );
  const formatGroupLabel = (data: any) => (
    <div>
      <span>{data.name[language]}</span>
    </div>
  );

  return (
    <Container>
      <div className="title-container">
        <h5>Product Promotions</h5>
      </div>
      <div className="description-box">
        <p className="text">
          Apply Promotions for your product by controlling sale prices and sale
          start and end dates .
        </p>
      </div>
      <Grid cols="1fr 1fr" p={2} gap="1rem">
        <Controller
          control={control}
          name="promotions.type"
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                value={
                  promotionTypeOptions.find((i) => i.value === value) as {
                    value: string;
                    label: string;
                  }
                }
                defaultValue="product_price"
                errors={errors.promotions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                options={promotionTypeOptions}
                label="Promotion type"
                onChange={(val) => onChange(val.value)}
              />
            );
          }}
        />

        {promotionType === "option_price" && (
          <Controller
            control={control}
            name="promotions.values_skus"
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  value={options.find((i: any) => i.value === value)}
                  isMulti
                  defaultValue="product_price"
                  onChange={(val) => onChange(val.value)}
                  errors={errors.promotions}
                  getOptionLabel={(option: any) => option.name[language]}
                  getOptionValue={(option: any) => option.sku}
                  options={options}
                  label="Selected Options"
                  placeholder="Select Options you want to apply promotion on"
                  formatOptionLabel={formatOptionLabel}
                  formatGroupLabel={formatGroupLabel}
                />
              );
            }}
          />
        )}
      </Grid>
      <Grid cols="1fr 1fr 1fr" gap="1rem" p={2}>
        <PrefixedIconedInput
          errors={errors.promotions?.sale_price}
          Icon={IoPricetagsOutline}
          name="sale_price"
          register={register}
          label="Sale Price"
          prefix="KD"
        />
        <Controller
          name="promotions.sale_start_date"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <DateIconedInput
                errors={errors.promotions?.sale_start_date}
                onChange={onChange}
                value={value}
                label="Sale Start Date"
              />
            );
          }}
        />
        <Controller
          name="promotions.sale_end_date"
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <DateIconedInput
                errors={errors.promotions?.sale_end_date}
                onChange={onChange}
                value={value}
                label="Sale End Date"
                ref={ref}
              />
            );
          }}
        />
      </Grid>
    </Container>
  );
};

export default ProductPromotions;

const Container = styled.div(
  ({ theme: { breakpoints, primary } }) => `
  background-color:#fff;
    .title-container {
        color: ${primary};
        margin-bottom:1rem;
    }
    .description-box {
      margin-bottom: 0.5rem;
     background-color: #ffe3d6;
     padding: 0.25rem 0.5rem;
     border-radius: 6px;
     font-size: 0.9rem;
    }
    .inputs-container {
     display: grid;
     grid-template-columns: 1fr;
     gap:1rem;
    }
    @media ${breakpoints.md}{
     .inputs-container {        
       grid-template-columns: 1fr 1fr 1fr;
     }
    }
`
);

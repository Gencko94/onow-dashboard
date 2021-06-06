import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Select from "../../reusable/Select";
interface IProps {
  register: any;
  errors: any;

  control: Control<any>;
}

const options = [
  {
    title: {
      en: "All Products",
      ar: "جميع المنتجات",
    },
    value: "all_products",
  },
  {
    title: {
      en: "Specified Categories",
      ar: "تصنيفات محددة",
    },
    value: "categories",
  },
  {
    title: {
      en: "Specific Products",
      ar: "منتجات محددة",
    },
    value: "specific_products",
  },
  {
    title: {
      en: "All Products except specific products",
      ar: "جميع المنتجات ما عدا منتجات محددة",
    },
    value: "all_products_specific",
  },
  {
    title: {
      en: "All Products except discounted products",
      ar: "جميع المنتجات ما عدا المنتجات المخفضة",
    },
    value: "all_products_discounted",
  },
  {
    title: {
      en: "Discounted Products Only",
      ar: "المنتجات المخفضة فقط",
    },
    value: "discounted",
  },
];
const CouponProducts = ({
  control,
  errors,

  register,
}: IProps) => {
  const coverage = useWatch({
    control,
    name: "coupon_coverage",
  });

  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="title-container">
        <h5>Coupon Products</h5>
      </div>
      <div className="box">
        <Controller
          control={control}
          name="coupon_coverage"
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                onChange={(val) => onChange(val.value)}
                errors={errors?.coupon_coverage}
                getOptionLabel={(option: any) => option.title[language]}
                getOptionValue={(option) => option.value}
                options={options}
                defaultValue="all_products"
                label="Coupon Coverage"
              />
            );
          }}
        />

        {(coverage === "all_products_specific" ||
          coverage === "categories" ||
          coverage === "specific_products") && (
          <Controller
            control={control}
            name="covered_data"
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  isMulti
                  onChange={(val) => onChange(val.value)}
                  errors={errors?.coupon_coverage}
                  getOptionLabel={(option: any) => option.title[language]}
                  getOptionValue={(option) => option.value}
                  options={options}
                  defaultValue="all_products"
                  label={`Select ${
                    coverage === "categories" ? "Categories" : "Products"
                  }`}
                />
              );
            }}
          />
        )}
      </div>
    </Container>
  );
};

export default CouponProducts;
const Container = styled.div(
  ({ theme: { breakpoints, mainColor, shadow } }) => `
    margin: 2rem 0;
    .title-container {
      padding: 1rem 0;
      color: ${mainColor};
    }
    .box {
      background-color: #fff;
      box-shadow: ${shadow};
      border-radius: 6px;
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media ${breakpoints.md} {
      .box {
        grid-template-columns: 1fr 1fr 1fr;
  
      }
    }
    `
);

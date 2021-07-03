import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Select from "../../reusable/Select";
import CouponCategoryList from "./CouponCategoryList";
import CouponProductsList from "./CouponProductsList";
import CouponProductsSearch from "./CouponProductsSearch";
interface IProps {
  register: any;
  errors: any;

  control: Control<any>;
}

const options = [
  {
    label: {
      en: "All Products",
      ar: "جميع المنتجات",
    },
    value: 1,
  },
  {
    label: {
      en: "Specified Categories",
      ar: "تصنيفات محددة",
    },
    value: 2,
  },
  {
    label: {
      en: "Specific Products",
      ar: "منتجات محددة",
    },
    value: 3,
  },
  {
    label: {
      en: "All Products except specific products",
      ar: "جميع المنتجات ما عدا منتجات محددة",
    },
    value: 4,
  },
  {
    label: {
      en: "All Products except discounted products",
      ar: "جميع المنتجات ما عدا المنتجات المخفضة",
    },
    value: 5,
  },
  {
    label: {
      en: "Discounted Products Only",
      ar: "المنتجات المخفضة فقط",
    },
    value: 6,
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
  console.log(coverage);
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Container>
      <div className="title-container">
        <h5>Coupon Coverage</h5>
      </div>
      <div className="box">
        <Controller
          control={control}
          name="coupon_coverage"
          render={({ field: { value, onChange } }) => {
            return (
              <Select
                value={
                  options.find((i) => i.value === value) as {
                    value: number;
                    label: {
                      [key: string]: string;
                    };
                  }
                }
                onChange={(val) => {
                  console.log(val);
                  onChange(parseInt(val.value));
                }}
                errors={errors?.couponCoverage}
                getOptionLabel={(option: any) => option.label[language]}
                getOptionValue={(option) => option.value.toString()}
                options={options}
                defaultValue={1}
                label="Coupon Coverage"
              />
            );
          }}
        />

        {(coverage === 3 || coverage === 4) && (
          <CouponProductsSearch
            control={control}
            title={
              coverage === 3
                ? "Search for the products you want to cover in the coupon"
                : "Search for the products you want to exclude"
            }
          />
        )}
        {(coverage === 3 || coverage === 4) && (
          <CouponProductsList
            control={control}
            title={coverage === 3 ? "Covered Products" : "Execluded Products"}
          />
        )}
        {coverage === 2 && (
          <div style={{ gridColumn: "2/4" }}>
            <CouponCategoryList
              control={control}
              errors={errors?.special_categories}
            />
          </div>
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

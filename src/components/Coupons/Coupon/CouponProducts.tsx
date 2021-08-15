import { useState } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PRODUCT } from "../../../interfaces/products/products";
import { up } from "../../../utils/themes";
import Box from "../../reusable/Box/Box";
import Select from "../../reusable/Select";
import Grid from "../../StyledComponents/Grid";
import Heading from "../../StyledComponents/Heading";
import CouponCategoryList from "./CouponCategoryList";
import CouponProductsList from "./CouponProductsList";
import CouponProductsSearch from "./CouponProductsSearch";
interface IProps {
  setValue: any;
  errors: any;
  watch: any;
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
const CouponProducts = ({ control, errors, watch, setValue }: IProps) => {
  const special_products = useWatch({
    control,
    name: "special_products",
  });
  const [products, setProducts] = useState<PRODUCT[]>([]);
  const coverage = watch("coupon_coverage");
  const handleRemoveProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setValue(
      "special_products",
      special_products.filter((i: number) => i !== id)
    );
  };
  const handleAddProduct = (product: any) => {
    const found = products.find((i: PRODUCT) => i.id === product.id);
    if (!found) {
      setProducts((prev) => [...prev, product]);
      setValue("special_products", [...special_products, product.id]);
    }
  };

  const {
    i18n: { language },
  } = useTranslation();
  return (
    <Box type="titled" boxTitle="Coupon Coverage">
      <Grid cols="repeat(auto-fit,minmax(300px,1fr))" gap="1rem">
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
            handleAddProduct={handleAddProduct}
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
            products={products}
            handleRemoveProduct={handleRemoveProduct}
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
      </Grid>
    </Box>
  );
};

export default CouponProducts;

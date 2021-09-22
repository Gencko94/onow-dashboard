import { Controller, useFormContext } from "react-hook-form";

import { firstTabInfo } from "./CreateProductGeneralInfo";
import Box from "../../reusable/Box/Box";
import ProductCategoriesTable from "../../Product/ProductGeneralInformation/ProductCategoriesTable";
import { useGetCategories } from "../../../hooks/data-hooks/categories/useGetCategories";
import { CATEGORY } from "../../../interfaces/categories/categories";
import LoadingTable from "../../reusable/LoadingTable";

const CreateProductCategories = () => {
  const {
    control,

    getValues,
  } = useFormContext<firstTabInfo>();

  const { data } = useGetCategories();
  function handleToggleCategories(
    category: CATEGORY,
    onChange: (...event: any[]) => void
  ) {
    const formCategories = getValues("category_id");
    if (typeof formCategories.find((i) => i === category.id) !== "undefined") {
      onChange([]);
    } else {
      onChange([...formCategories, category.id]);
    }
  }
  return (
    <Box disabledContentPadding type="titled" boxTitle="Product Category">
      <Controller
        control={control}
        name="category_id"
        rules={{
          required: "Required",
        }}
        // defaultValue={formValues?.product_category_id}
        render={({ field: { onChange, value } }) =>
          data ? (
            <ProductCategoriesTable
              handleToggleCategories={handleToggleCategories}
              onChange={onChange}
              data={data}
              selected={value}
            />
          ) : (
            <LoadingTable />
          )
        }
      />

      {/* <CategoriesList error={Boolean(errors?.category_id)}>
        <AddCategoryModalBody
          control={control}
          errors={Boolean(errors?.category_id)}
        />
      </CategoriesList> */}
    </Box>
  );
};

export default CreateProductCategories;

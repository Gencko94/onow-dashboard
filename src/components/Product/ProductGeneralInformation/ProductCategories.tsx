// import { useFormContext } from "react-hook-form";
// import { FORM_PROPS } from "./ProductGeneralInformation";
import Box from "../../reusable/Box/Box";
// import { useGetCategories } from "../../../hooks/data-hooks/categories/useGetCategories";

const ProductCategories = () => {
  // const {} = useFormContext<FORM_PROPS>();
  // const { data } = useGetCategories();
  return (
    <Box disabledContentPadding type="titled" boxTitle="Product Category">
      {/* {data && <ProductCategoriesTable data={data} />} */}
      {/* <CategoriesList>
        <ProductCategoryList control={control} errors={errors.category} /> 
      </CategoriesList> */}
    </Box>
  );
};

export default ProductCategories;

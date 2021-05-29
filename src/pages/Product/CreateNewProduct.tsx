import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import ProductGeneralInfo from "../../components/AddProduct/ProductGeneralInfo/ProductGeneralInfo";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { NEW_PRODUCT } from "../../interfaces/products/products";

const CreateNewProduct = () => {
  const methods = useForm<NEW_PRODUCT>({
    defaultValues: {
      maxQtyPerUser: 5,
    },
  });
  return (
    <form>
      <FormProvider {...methods}>
        <Breadcrumbs
          childLabel="Create New Product"
          parentLabel="Products"
          parentTarget="/products"
        />
        <ProductGeneralInfo />
      </FormProvider>
      <div>d</div>
    </form>
  );
};

export default CreateNewProduct;
const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.75rem;
`;

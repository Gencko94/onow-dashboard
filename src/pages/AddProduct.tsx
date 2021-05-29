import { createContext, lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AddProductTabs from "../components/AddProduct/AddProductTabs/AddProductTabs";
import { NEW_PRODUCT, NEW_VARIATION } from "../interfaces/products/products";
import Loading from "../utils/Loading";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useLocation } from "react-router";
import OrderingOptions from "../components/AddProduct/OrderingOptions/OrderingOptions";
const ProductGeneralInfo = lazy(
  () => import("../components/AddProduct/ProductGeneralInfo/ProductGeneralInfo")
);
const ProductDetails = lazy(
  () => import("../components/AddProduct/ProductDetails/ProductDetails")
);
const ProductVariationsAndPricing = lazy(
  () =>
    import(
      "../components/AddProduct/ProductVariations/ProductVariationsAndPricing"
    )
);
interface ADD_PRODUCT_CONTEXT_PROPS {
  variations: NEW_VARIATION[];
  handleAddVariations: (variation: NEW_VARIATION) => void;
}

export const AddProductProvider = createContext<
  Partial<ADD_PRODUCT_CONTEXT_PROPS>
>({});
const AddProduct = () => {
  const location = useLocation();

  const { t } = useTranslation();

  const methods = useForm<NEW_PRODUCT>({
    defaultValues: {
      maxQtyPerUser: 5,
    },
  });

  const [activeTab, setActiveTab] = useState(0);
  const [variations, setVariations] = useState<NEW_VARIATION[]>([]);
  const onSubmit: SubmitHandler<NEW_PRODUCT> = (data) => {
    console.log({ ...data, productVariations: variations });
    console.log(data.price);
  };
  const onError: SubmitErrorHandler<NEW_PRODUCT> | undefined = (errors) => {
    console.log(errors);
    if (errors.name || errors.name_ar) {
      setActiveTab(0);
    } else if (errors.price) {
      setActiveTab(2);
    }
  };
  const handleAddVariations = (variation: NEW_VARIATION) => {
    setVariations((prev) => [...prev, variation]);
  };
  return (
    <div>
      {/* <AddProductPanel /> */}

      <FormGrid onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <FormProvider {...methods}>
          <AddProductProvider.Provider
            value={{ handleAddVariations, variations }}
          >
            <Suspense fallback={<Loading />}>
              {activeTab === 0 && <ProductGeneralInfo />}
              {activeTab === 1 && <ProductDetails />}
              {activeTab === 2 && <ProductVariationsAndPricing />}
              {activeTab === 3 && <OrderingOptions />}
            </Suspense>
          </AddProductProvider.Provider>
        </FormProvider>
        <AddProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </FormGrid>
    </div>
  );
};

export default AddProduct;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.75rem;
`;

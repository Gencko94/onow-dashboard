import { createContext, lazy, Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import AddProductPanel from '../components/AddProduct/AddProductPanel/AddProductPanel';
import AddProductTabs from '../components/AddProduct/AddProductTabs/AddProductTabs';
import { NEW_PRODUCT, PRODUCT_TYPE } from '../interfaces/products/products';
import * as Yup from 'yup';
import Loading from '../utils/Loading';
import {
  Control,
  DeepMap,
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router';
const GeneralProductInfo = lazy(
  () => import('../components/AddProduct/GeneralProductInfo/GeneralProductInfo')
);
const ProductDetails = lazy(
  () => import('../components/AddProduct/ProductDetails/ProductDetails')
);
const ProductVariations = lazy(
  () => import('../components/AddProduct/ProductVariations/ProductVariations')
);
interface ADD_PRODUCT_CONTEXT_PROPS {
  register: UseFormRegister<NEW_PRODUCT>;
  errors: DeepMap<NEW_PRODUCT, FieldError>;
  control: Control<NEW_PRODUCT>;
  setValue: UseFormSetValue<NEW_PRODUCT>;
}

export const AddProductProvider = createContext<
  Partial<ADD_PRODUCT_CONTEXT_PROPS>
>({});
const AddProduct = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NEW_PRODUCT>();
  const [productType, setProductType] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const onSubmit: SubmitHandler<NEW_PRODUCT> = data => {
    console.log(data);
  };
  const onError: SubmitErrorHandler<NEW_PRODUCT> | undefined = errors => {
    console.log(errors);
    if (errors.name || errors.name_ar || errors.price) {
      setActiveTab(0);
    }
  };
  return (
    <Container>
      {/* <AddProductPanel /> */}
      <FormGrid onSubmit={handleSubmit(onSubmit, onError)}>
        <AddProductProvider.Provider
          value={{ register, errors, control, setValue }}
        >
          <Suspense fallback={<Loading />}>
            {activeTab === 0 && <GeneralProductInfo />}
            {activeTab === 1 && <ProductDetails />}
            {activeTab === 2 && <ProductVariations />}
          </Suspense>
        </AddProductProvider.Provider>
        <AddProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </FormGrid>
    </Container>
  );
};

export default AddProduct;
const Container = styled.div`
  padding: 0.75rem;
`;
const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  gap: 0.75rem;
`;

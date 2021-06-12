import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import ProductPromotions from "../../components/AddProduct/ProductPromotions/ProductPromotions";
import ProductGeneralInformation from "../../components/Product/ProductGeneralInformation/ProductGeneralInformation";
import ProductOrderingAndBranchAvailability from "../../components/Product/ProductOrderingAndBranchAvailability/ProductOrderingAndBranchAvailability";
import ProductPricingAndOptions from "../../components/Product/ProductPricingAndOptions/ProductPricingAndOptions";
import ProductTabs from "../../components/Product/ProductTabs/ProductTabs";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";

import { getSingleProduct } from "../../utils/test-queries";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery(["product", id], () => getSingleProduct(id), {
    suspense: true,
  });
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
  return (
    <div>
      <Breadcrumbs
        childLabel="Product"
        parentLabel="Products"
        parentTarget="/products"
      />

      <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Wrapper>
        {activeTab === 0 && <ProductGeneralInformation data={data!} />}
        {activeTab === 1 && <ProductPricingAndOptions data={data!} />}
        {activeTab === 2 && (
          <ProductOrderingAndBranchAvailability data={data!} />
        )}

        {activeTab === 3 && <ProductPromotions />}
      </Wrapper>
    </div>
  );
};

export default Product;

const Wrapper = styled.div`
  box-shadow: 0px 4px 7px 2px rgb(213, 213, 213);
  border-radius: 0 6px 6px 6px;
  padding: 1rem;
  background-color: #fff;
`;

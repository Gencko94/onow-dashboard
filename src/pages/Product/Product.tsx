import { useState } from "react";
import { useParams } from "react-router";
// import ProductPromotions from "../../components/AddProduct/ProductPromotions/ProductPromotions";
import ProductGeneralInformation from "../../components/Product/ProductGeneralInformation/ProductGeneralInformation";
import ProductImaging from "../../components/Product/ProductImages/ProductImaging";
import ProductOrderingAndBranchAvailability from "../../components/Product/ProductOrderingAndBranchAvailability/ProductOrderingAndBranchAvailability";
import ProductPanel from "../../components/Product/ProductPanel";
import ProductPricingAndOptions from "../../components/Product/ProductPricingAndOptions/ProductPricingAndOptions";
import ProductTabs from "../../components/Product/ProductTabs/ProductTabs";

import { useGetProduct } from "../../hooks/data-hooks/product.hooks";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProduct(parseInt(id));
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3 | 4>(0);
  return (
    <div>
      <ProductPanel id={data!.id} />

      <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === 0 && <ProductGeneralInformation data={data!} />}
        {activeTab === 1 && <ProductImaging data={data!} />}
        {activeTab === 2 && <ProductPricingAndOptions data={data!} />}
        {activeTab === 3 && (
          <ProductOrderingAndBranchAvailability data={data!} />
        )}

        {/* {activeTab === 3 && <ProductPromotions />} */}
      </div>
    </div>
  );
};

export default Product;

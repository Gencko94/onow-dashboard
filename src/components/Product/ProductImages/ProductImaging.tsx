import { PRODUCT } from "../../../interfaces/products/products";

import ProductImage from "./ProductImage";

interface IProps {
  data: PRODUCT;
}

const ProductImaging = ({ data }: IProps) => {
  return <ProductImage data={data} />;
};

export default ProductImaging;

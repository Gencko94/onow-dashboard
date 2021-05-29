import { useForm } from "react-hook-form";
import Breadcrumbs from "../../components/reusable/Breadcrumbs";
import { PRODUCT } from "../../interfaces/products/products";

const Product = () => {
  const methods = useForm<PRODUCT>({
    defaultValues: {},
  });
  return (
    <div>
      <Breadcrumbs
        childLabel="Product"
        parentLabel="Products"
        parentTarget="/products"
      />
    </div>
  );
};

export default Product;

import { useQuery } from "react-query";
import { getProduct } from "../../utils/queries/productQueries";

export const useGetProduct = (id: number) =>
  useQuery(["product", id], () => getProduct(id), {
    suspense: true,
  });

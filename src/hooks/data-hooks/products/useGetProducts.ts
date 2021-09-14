import { useInfiniteQuery, useQuery } from "react-query";
import { PRODUCT } from "../../../interfaces/products/products";
import { getProducts, getPaginatedProducts } from "../../../utils/queries";

interface IProps {
  sortBy?: any;
  debouncedSearchValue?: string;
  globalSearchBarValue?: string;
}
export const useGetPaginatedProducts = ({
  debouncedSearchValue,

  sortBy,
  globalSearchBarValue,
}: IProps) => {
  return useInfiniteQuery(
    ["products", sortBy, debouncedSearchValue],
    ({ pageParam = 1 }) =>
      getPaginatedProducts(sortBy, pageParam, debouncedSearchValue as string),
    {
      keepPreviousData: globalSearchBarValue !== "" ? false : true,

      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.lastPage) {
          return lastPage.currentPage + 1;
        } else {
          return undefined;
        }
      },
    }
  );
};
export const useGetProducts = () => {
  return useQuery("products", getProducts);
};

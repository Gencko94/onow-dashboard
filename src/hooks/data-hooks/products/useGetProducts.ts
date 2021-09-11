import { useInfiniteQuery } from "react-query";
import { getProducts } from "../../../utils/queries";

interface IProps {
  sortBy: any;
  debouncedSearchValue?: string;
  globalSearchBarValue?: string;
}
export const useGetProducts = ({
  debouncedSearchValue,

  sortBy,
  globalSearchBarValue,
}: IProps) => {
  return useInfiniteQuery(
    ["products", sortBy, debouncedSearchValue],
    ({ pageParam = 1 }) =>
      getProducts(sortBy, pageParam, debouncedSearchValue as string),
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

import { useInfiniteQuery, useQuery } from "react-query";
import { CATEGORY } from "../../../interfaces/categories/categories";
import {
  getCategories,
  getPaginatedCategories,
} from "../../../utils/queries/categoriesQueries";

interface IProps {
  sortBy?: any;
}
interface GET_CATEGORIES_RES {
  data: CATEGORY[];
  currentPage: number;
  lastPage: number;
}
export const useGetPaginatedCategories = ({ sortBy }: IProps) => {
  return useInfiniteQuery<GET_CATEGORIES_RES>(
    "categories",
    ({ pageParam = 1 }) => getPaginatedCategories(pageParam),
    {
      keepPreviousData: true,

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
export const useGetCategories = () => {
  return useQuery<CATEGORY[]>("categories", getCategories);
};

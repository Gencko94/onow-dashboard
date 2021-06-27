import queryString from "query-string";
import { useLocation } from "react-router";

export const useQueryParams = () => {
  return queryString.parse(useLocation().search);
};

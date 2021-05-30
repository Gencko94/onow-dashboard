import { useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getProductsList } from "../../../utils/test-queries";
import TableHead from "../../reusable/TableHead";
import ProductCard from "../ProductsGrid/ProductCard/ProductCard";
import ProductItem from "./ProductItem";

const ProductsList = () => {
  const { data } = useQuery("products", getProductsList, { suspense: true });
  const cols = useMemo(
    () => [
      { title: " ", sortable: false },
      { title: "image", sortable: false },
      { title: "productName", sortable: false },
      { title: "quantity", sortable: false },
      { title: "category", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  return (
    <Container>
      <TableHead cols={cols} gridCols="50px 1fr 1fr 1fr 1fr 1fr 1fr " />
      {data?.map((product) => {
        return <ProductItem product={product} />;
      })}
    </Container>
  );
};

export default ProductsList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.shadow};
`;

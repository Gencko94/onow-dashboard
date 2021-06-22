import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { PRODUCT } from "../../../interfaces/products/products";
import extractError from "../../../utils/extractError";
import { deleteProduct, getProducts } from "../../../utils/queries";
import Button from "../../reusable/Button";
import ConfirmationModal from "../../reusable/ConfirmationModal";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead";
import Flex from "../../StyledComponents/Flex";
import ProductItem from "./ProductItem";

const ProductsList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const [modalStatus, setModalStatus] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });

  const queryClient = useQueryClient();

  const [sortBy, setSortBy] = useState<{
    field: string;
    order: "asc" | "desc";
  }>({
    field: "created_at",
    order: "desc",
  });

  const { data, status, isFetching } = useQuery(
    ["products", sortBy],
    () => getProducts(sortBy),
    {
      keepPreviousData: true,
    }
  );

  // Delete Mutation
  const { mutateAsync, reset } = useMutation(deleteProduct, {
    onSuccess: (data, productId) => {
      queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
        return prev?.filter((i) => i.id !== parseInt(productId));
      });
    },
  });

  const handleDeleteProduct = async (id: number) => {
    try {
      await mutateAsync(id.toString());
    } catch (error) {
      const { responseError } = extractError(error);
      if (responseError) {
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "success",
        });
      }
    }
  };

  const cols = useMemo(
    () => [
      { title: " ", sortable: false },
      { title: "image", sortable: false },
      {
        title: "name",
        sortable: true,
        cb: () => {
          if (sortBy.field === "name") {
            if (sortBy.order === "asc") {
              setSortBy({ field: "name", order: "desc" });
            } else {
              setSortBy({ field: "name", order: "asc" });
            }
          } else {
            setSortBy({ field: "name", order: "desc" });
          }
        },
      },
      { title: "quantity", sortable: false },
      {
        title: "price",
        sortable: true,
        cb: () => {
          if (sortBy.field === "price") {
            if (sortBy.order === "asc") {
              setSortBy({ field: "price", order: "desc" });
            } else {
              setSortBy({ field: "price", order: "asc" });
            }
          } else {
            setSortBy({ field: "price", order: "desc" });
          }
        },
      },
      { title: "category", sortable: false },
      { title: "enabled", sortable: false },
      { title: "actions", sortable: false },
    ],
    [sortBy.field, sortBy.order]
  );
  const handleToggleRows = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((i) => i !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };
  if (status === "loading") return <LoadingTable />;

  return (
    <>
      {selectedRows.length > 0 && (
        <Flex justify="flex-end" margin="1rem 0 ">
          <p>Selected Rows ({selectedRows.length}) : </p>
          <Flex margin="0 0.5rem">
            <Button
              bg="danger"
              padding="0.25rem"
              textSize="0.8rem"
              text="Delete Products"
              withRipple
              withTransition
            />
          </Flex>
        </Flex>
      )}
      <Container>
        {data?.length !== 0 && (
          <TableHead
            activeSortBy={sortBy.field}
            activeOrder={sortBy.order}
            cols={cols}
            gridCols="50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr "
          />
        )}
        <div className="table">
          {isFetching && "Fetching"}
          {data?.length === 0 && (
            <EmptyTable
              iconImage="/images/food.png"
              text="Oops, we didn't find any products !"
              height="400px"
              withButton
              btnText="Create New Product"
              cb={() => history.push("/products/product/create")}
            />
          )}
        </div>
        {data?.map((product) => {
          return (
            <ProductItem
              product={product}
              handleDeleteProduct={handleDeleteProduct}
              setModalStatus={setModalStatus}
              selectedRows={selectedRows}
              handleToggleRows={handleToggleRows}
            />
          );
        })}

        <ConfirmationModal
          isOpen={modalStatus.open}
          closeFunction={() => setModalStatus({ id: null, open: false })}
          desc="Are you sure you want to delete this product ?"
          successButtonText="Delete"
          successFunction={() => handleDeleteProduct(modalStatus.id!)}
          title="Delete Product"
          styles={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        />
      </Container>
    </>
  );
};

export default ProductsList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  .table {
    background-color: #fff;
  }
`;

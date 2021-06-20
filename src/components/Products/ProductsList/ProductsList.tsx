import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { PRODUCT } from "../../../interfaces/products/products";
import { deleteProduct, getProducts } from "../../../utils/queries";
import ConfirmationModal from "../../reusable/ConfirmationModal";
import EmptyTable from "../../reusable/EmptyTable";
import ErrorToast from "../../reusable/ErrorToast";
import TableHead from "../../reusable/TableHead";
import ProductItem from "./ProductItem";

const ProductsList = () => {
  const history = useHistory();
  const [modalStatus, setModalStatus] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });
  const queryClient = useQueryClient();
  const { data } = useQuery("products", getProducts, { suspense: true });
  // Delete Mutation

  const {
    mutateAsync,
    reset,
    isError: deleteError,
  } = useMutation(deleteProduct, {
    onSuccess: (data, productId) => {
      queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
        return prev?.filter((i) => i.id !== parseInt(productId));
      });
    },
  });

  const handleDeleteCoupon = async (id: number) => {
    try {
      await mutateAsync(id.toString());
    } catch (error) {
      console.log(error);
    }
  };

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
      {data?.length !== 0 && (
        <TableHead cols={cols} gridCols="50px 1fr 1fr 1fr 1fr 1fr 1fr " />
      )}
      <div className="table">
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
            handleDeleteCoupon={handleDeleteCoupon}
            setModalStatus={setModalStatus}
          />
        );
      })}
      <CSSTransition
        in={deleteError}
        classNames="error-toast"
        unmountOnExit
        timeout={200}
      >
        <ErrorToast
          text="Something Went Wrong"
          btnText="Close"
          closeFunction={reset}
        />
      </CSSTransition>
      <ConfirmationModal
        isOpen={modalStatus.open}
        closeFunction={() => setModalStatus({ id: null, open: false })}
        desc="Are you sure you want to delete this product ?"
        successButtonText="Delete"
        successFunction={() => handleDeleteCoupon(modalStatus.id!)}
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
  );
};

export default ProductsList;
const Container = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: ${(props) => props.theme.border};
  /* box-shadow: ${(props) => props.theme.shadow}; */
  .table {
    background-color: #fff;
  }
`;

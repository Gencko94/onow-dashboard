import { useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import useToast from "../../hooks/useToast";
import extractError from "../../utils/extractError";
import { deleteProduct } from "../../utils/queries";
import Breadcrumbs from "../reusable/Breadcrumbs";
import Button from "../reusable/Button";
import Popover from "../reusable/Popover";
import Select from "../reusable/Select";
import Flex from "../StyledComponents/Flex";
import Grid from "../StyledComponents/Grid";
import Heading from "../StyledComponents/Heading";
import Paragraph from "../StyledComponents/Paragraph";

const statuses = [
  { label: "Active", value: 1 },
  { label: "Hidden", value: "hidden" },
];

const ProductPanel = ({ id }: { id: number }) => {
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);

  const { setToastStatus, handleCloseToast } = useToast();

  const queryClient = useQueryClient();
  const { setConfirmationModalStatus, handleCloseConfirmationModal } =
    useConfirmationModal();
  const {
    mutateAsync,
    reset,
    isLoading: deleteLoading,
  } = useMutation(deleteProduct, {
    onSuccess: (data, productId) => {
      queryClient.invalidateQueries("products");
    },
  });
  const handleDeleteProduct = async (id: number) => {
    handleCloseConfirmationModal?.();
    try {
      await mutateAsync(id.toString());
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Product Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();

      const { responseError } = extractError(error);
      if (responseError) {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: responseError,
          type: "error",
        });
      } else {
        setToastStatus?.({
          fn: () => {
            reset();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  return (
    <Container>
      <Grid
        gap="0.5rem"
        cols="repeat(auto-fit,minmax(300px,auto))"
        items="center"
      >
        <div>
          <Heading tag="h2" margin="1rem 0" weight="bold">
            Product
          </Heading>
          <Breadcrumbs
            withoutTitle
            children={[
              {
                name: { ar: "المنتجات", en: "Products" },
                target: "/products",
              },
              {
                name: { ar: "بيانات المنتج", en: "Product Details" },
                target: "",
              },
            ]}
          />
        </div>
        <Grid cols="60px 200px 100px" gap="1rem" items="center" justify="end">
          {/* <Flex> */}
          <Paragraph>Status :</Paragraph>
          <Select
            options={statuses}
            getOptionLabel={(o) => o.label}
            getOptionValue={(o) => o.value.toString()}
            onChange={() => {}}
            value={statuses[0]}
          />
          {/* </Flex> */}
          <Button color="primary" onClick={() => setActionsMenuOpen(true)}>
            Actions
            <CSSTransition
              in={actionsMenuOpen}
              classNames="menu"
              unmountOnExit
              timeout={100}
            >
              <Popover closeFunction={() => setActionsMenuOpen(false)}>
                <Button
                  onClick={(e) => {
                    setActionsMenuOpen(false);
                    e.stopPropagation();
                    setConfirmationModalStatus?.({
                      open: true,
                      desc: "Are you sure you want to delete this Product ?",
                      title: "Delete Product",
                      closeCb: handleCloseConfirmationModal!,
                      successCb: () => handleDeleteProduct(id),
                    });
                  }}
                >
                  Delete Product
                </Button>
              </Popover>
            </CSSTransition>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPanel;
const Container = styled.div`
  background-color: #fff;
`;

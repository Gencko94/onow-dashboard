import { useMutation, useQueryClient } from "react-query";

import styled from "styled-components";
import useConfirmationModal from "../../hooks/useConfirmationModal/useConfirmationModal";
import useToast from "../../hooks/useToast";
import extractError from "../../utils/extractError";
import { deleteProduct } from "../../utils/queries/productQueries";
import Breadcrumbs from "../reusable/Breadcrumbs";
import Button from "../reusable/Button";

import Select from "../reusable/Select";

import Grid from "../StyledComponents/Grid";
import Heading from "../StyledComponents/Heading";
import Paragraph from "../StyledComponents/Paragraph";
import Sparkles from "../reusable/FancyStuff/Sparkles";
import { Menu, MenuButton, MenuItem, MenuPopover } from "@reach/menu-button";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Spacer from "../reusable/Spacer";
const statuses = [
  { label: "Active", value: 1 },
  { label: "Hidden", value: "hidden" },
];

const ProductPanel = ({ id }: { id: number }) => {
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
      await mutateAsync(id);
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
        columns="repeat(auto-fit,minmax(300px,auto))"
        items="center"
      >
        <div>
          <Sparkles>
            <Heading tag="h2" type="large-title">
              Product
            </Heading>
          </Sparkles>
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
        <Grid
          columns="60px 200px 100px"
          gap="1rem"
          items="center"
          justify="end"
        >
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
          <Menu>
            {({ isExpanded }) => {
              return (
                <>
                  <MenuButton>
                    <Button color="primary">
                      Actions{" "}
                      {isExpanded ? (
                        <FiChevronUp size={18} />
                      ) : (
                        <FiChevronDown size={18} />
                      )}
                    </Button>
                  </MenuButton>
                  <MenuPopover
                    className="slide-down"
                    position={(button, popover) => {
                      return {
                        top: button!.bottom + 10,
                        left: button!.left - 20,
                      };
                    }}
                  >
                    <MenuItem
                      onSelect={() => {
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
                    </MenuItem>
                  </MenuPopover>
                </>
              );
            }}
          </Menu>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPanel;
const Container = styled.div`
  /* background-color: #fff; */
`;

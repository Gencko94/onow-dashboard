import React, { useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useToast from "../../../hooks/useToast";
import { CATEGORY } from "../../../interfaces/categories/categories";
import extractError from "../../../utils/extractError";
import {
  activateCategory,
  deleteCategory,
  deleteMultipleCategories,
} from "../../../utils/queries/categoriesQueries";
import Button from "../../reusable/Button";
import EmptyTable from "../../reusable/EmptyTable";
import LoadingTable from "../../reusable/LoadingTable";
import TableHead from "../../reusable/TableHead/TableHead";
import Flex from "../../StyledComponents/Flex";
import CategoryItem from "./CategoryItem";
import Spinner from "react-loader-spinner";
import useConfirmationModal from "../../../hooks/useConfirmationModal/useConfirmationModal";
import { useGetCategories } from "../../../hooks/data-hooks/categories/useGetCategories";

const CategoriesList = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const history = useHistory();

  const { setToastStatus, handleCloseToast } = useToast();

  const { handleCloseConfirmationModal, setConfirmationModalStatus } =
    useConfirmationModal();

  const queryClient = useQueryClient();

  // Activate Mutation
  const {
    mutateAsync: activationMutation,
    reset: resetActivation,
    isLoading: activationLoading,
  } = useMutation(activateCategory, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
    },
  });
  // Delete Mutation
  const { mutateAsync, reset } = useMutation(deleteCategory, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
      // queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
      //   return prev?.filter((i) => i.id !== parseInt(productId));
      // });
    },
  });
  // Delete multiple Mutation
  const {
    mutateAsync: multipleMutation,
    reset: multipleReset,
    isLoading: multipleLoading,
  } = useMutation(deleteMultipleCategories, {
    onSuccess: (data, categoryId) => {
      queryClient.invalidateQueries("categories");
      // queryClient.setQueryData<PRODUCT[] | undefined>("products", (prev) => {
      //   return prev?.filter((i) => i.id !== parseInt(productId));
      // });
    },
  });
  const cols = useMemo(
    () => [
      { title: "", sortable: false },
      { title: "ID", sortable: false },
      { title: "image", sortable: false },
      { title: "name", sortable: false },

      { title: "status", sortable: false },
      { title: "actions", sortable: false },
    ],
    []
  );
  const handleActivateCategory = async (id: number, active: number) => {
    try {
      await activationMutation({ id, active });
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Status Changed",
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
            resetActivation();
            handleCloseToast?.();
          },
          open: true,
          text: "Something went wrong",
          type: "error",
        });
      }
    }
  };
  const handleDeleteCategory = async (id: number) => {
    try {
      await mutateAsync(id.toString());
      handleCloseConfirmationModal?.();
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Category Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();
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
          type: "error",
        });
      }
    }
  };
  const handleDeleteMultipleCategories = async (ids: number[]) => {
    try {
      handleCloseConfirmationModal?.();
      await multipleMutation(ids);
      setToastStatus?.({
        fn: () => {
          handleCloseToast?.();
        },
        open: true,
        text: "Categories Deleted Successfully",
        type: "success",
      });
    } catch (error) {
      handleCloseConfirmationModal?.();
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
          type: "error",
        });
      }
    }
  };
  const handleToggleRows = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows((prev) => prev.filter((i) => i !== rowId));
    } else {
      setSelectedRows((prev) => [...prev, rowId]);
    }
  };
  return <></>;
};

export default CategoriesList;
const Container = styled.div`
  position: relative;

  border-bottom: none;
  .table {
    border: ${(props) => props.theme.border};
    box-shadow: ${(props) => props.theme.shadow};
    border-radius: 20px;
    overflow-x: auto;
    background-color: ${(props) => props.theme.subtleBackground};
  }
  .loading {
    position: absolute;
    z-index: 2;
    top: -14px;
    left: 15px;
  }
`;

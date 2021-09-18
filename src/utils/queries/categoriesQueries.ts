import axios, { AxiosRequestConfig } from "axios";
import { customerUri } from "../../constants";
import {
  CATEGORY,
  EDIT_CATEGORY,
  NEW_CATEGORY,
} from "../../interfaces/categories/categories";

//get Categories

export const getCategories = async () => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      limit: 1000,
    },
  };
  const res = await axios.get(`${customerUri}/product-categories`, config);

  return res.data.results.data;
};
// get Paginated categories
export const getPaginatedCategories = async (
  pageParam: number,
  limit?: number
) => {
  const t = localStorage.getItem("dshtid");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      limit: limit ?? 20,
      page: pageParam,
    },
  };
  const res = await axios.get(`${customerUri}/product-categories`, config);
  return {
    data: res.data.results.data,
    currentPage: res.data.results.pagination.current,
    lastPage: res.data.results.pagination.last,
  };
};
export const getCategory = async (id: string): Promise<CATEGORY> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(
    `${customerUri}/product-categories/${id}`,
    config
  );
  return res.data.results;
};
export const activateCategory = async ({
  id,
  active,
}: {
  id: number;
  active: number;
}): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/activate-category/${id}`,
    { active },
    config
  );
  return res.data.results;
};
//Create Category

export const createCategory = async (
  category: NEW_CATEGORY
): Promise<CATEGORY> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("active", category.active as any);
  formData.append("name", JSON.stringify(category.name));
  formData.append("description", JSON.stringify(category.description));
  if (category.image) {
    formData.append("image", category.image);
  }
  if (category.parent_id) {
    formData.append("parent_id", JSON.stringify(category.parent_id));
  }
  formData.append("slug", category.slug);
  const res = await axios.post(
    `${customerUri}/product-categories`,
    formData,
    config
  );
  return res.data.results;
};
// Edit Category

export const editCategory = async (category: EDIT_CATEGORY) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const payLoad = {
    seo_description: null,
    active: category.active,
    name: category.name,
    parent_id: category.parent_id,
    description: category.description,
    slug: category.slug,
  };
  const res = await axios.put(
    `${customerUri}/product-categories/${category.id}`,
    payLoad,
    config
  );
  return res.data.results;
};
//Edit category image

// Remove Category Image
export const removeCategoryImage = async (id: number) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };

  const res = await axios.get(
    `${customerUri}/product-categories-remove-image/${id}`,

    config
  );
  return res.data.results;
};
// Delete Category
export const deleteCategory = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/product-categories/${id}`,
    config
  );
  return res.data.results;
};
// Delete Multiple Categories
export const deleteMultipleCategories = async (
  ids: number[]
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/delete-multi-product-categories`,
    { ids },
    config
  );
  return res.data.results;
};

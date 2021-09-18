import axios, { AxiosRequestConfig } from "axios";
import { customerUri } from "../../constants";
import {
  NEW_OPTION_VALUE,
  NEW_PRODUCT,
} from "../../interfaces/products/create-new-product";
import {
  OPTION_VALUE,
  PRODUCT,
  PRODUCT_OPTION,
} from "../../interfaces/products/products";

// Get Products
export const getProducts = async () => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      // page: pageParam,
      limit: 1000,
    },
  };
  const res = await axios.get(`${customerUri}/products`, config);
  return res.data.results.data;
};
//Get Paginated Products

export const getPaginatedProducts = async (
  sortBy: {
    field: string;
    order: string;
  },
  pageParam: number,
  search?: string
) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      sort: sortBy.order,
      field: sortBy.field,
      page: pageParam,
      limit: 5,
      search,
    },
  };
  const res = await axios.get(`${customerUri}/products`, config);
  return {
    data: res.data.results.data,
    lastPage: res.data.results.pagination.last,
    currentPage: res.data.results.pagination.current,
  };
};
export const getProduct = async (id: number): Promise<PRODUCT> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/products/${id}`, config);
  return res.data.results;
};
//Create
export const createProduct = async (product: NEW_PRODUCT) => {
  const t = localStorage.getItem("dshtid");
  console.log(product);
  const formData = new FormData();
  // Appending Form Data
  formData.append("name", JSON.stringify(product.name));
  product.images.forEach((image) => formData.append("images[]", image));
  if (product.thumbnail) {
    formData.append("thumbnail", product.thumbnail);
  }
  formData.append("description", JSON.stringify(product.description));
  formData.append("price", product.price as any);
  formData.append("price_by_options", JSON.stringify(product.price_by_options));
  formData.append("sku", product.sku);
  if (product.prep_time) {
    formData.append("prep_time", product.prep_time as any);
  }
  formData.append("allow_side_notes", JSON.stringify(product.allow_side_notes));
  formData.append(
    "allow_attachments",
    JSON.stringify(product.allow_attachments)
  );
  formData.append("max_qty_per_user", JSON.stringify(product.max_qty_per_user));
  formData.append(
    "branch_availability",
    JSON.stringify(product.branch_availability)
  );
  formData.append("options", JSON.stringify(product.options));
  if (product.quantity) {
    formData.append("quantity", JSON.stringify(product.quantity) as any);
  }
  formData.append("product_category_id", product.product_category_id as any);
  formData.append("active", product.active as any);
  formData.append("slug", JSON.stringify(product.slug));

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await axios.post(`${customerUri}/products`, formData, config);
  return res.data.results;
};

//Activation
export const activateProduct = async ({
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
    `${customerUri}/activate-product/${id}`,
    { active },
    config
  );
  return res.data.results;
};
export const deleteProduct = async (
  id: number
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${customerUri}/products/${id}`, config);
  return res.data.results;
};
//Delete Multiple
export const deleteMultipleProducts = async (
  ids: number[]
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/delete-multi-products`,
    { productIds: ids },
    config
  );
  return res.data.results;
};
// Search for products
export const searchProducts = async (search: string, pageParam: number) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
    params: {
      search,
      pageParam,
    },
  };
  const res = await axios.get(`${customerUri}/products`, config);
  return {
    data: res.data.results.data,
    lastPage: res.data.results.pagination.last,
    currentPage: res.data.results.pagination.current,
  };
};
export const editProductGeneralInfo = async (data: any) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/edit-generale-info-product/${data.id}`,
    data,
    config
  );
  return res.data.results;
};
export const editProductPriceAndOptions = async (data: any) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/edit-price-options-product/${data.id}`,
    data,
    config
  );
  return res.data.results;
};
export const editProductOrderingAndAvailability = async (data: any) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/edit-ordering-options-branch-availability-product/${data.id}`,
    data,
    config
  );
  return res.data.results;
};
export const removeProductImage = async (imageId: number) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/product-images/${imageId}`,

    config
  );
  return res.data.results;
};

// Edit Product Option
export const editProductOption = async ({
  productId,
  option,
}: {
  productId: number;
  option: PRODUCT_OPTION;
}): Promise<PRODUCT_OPTION> => {
  console.log(option);
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/products/${productId}/option/${option.id}`,
    {
      name: option.name,
      select_type: option.select_type,
      max_picks: option.max_picks,
      required: option.required,
    },
    config
  );
  return res.data.results;
};
// Add Product Option
export const addProductOption = async ({
  productId,
  option,
}: {
  productId: number;
  option: any;
}): Promise<PRODUCT_OPTION> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/products/${productId}/option`,
    option,
    config
  );
  return res.data.results;
};
// Delete Product Option
export const deleteProductOption = async ({
  productId,
  optionId,
}: {
  productId: number;
  optionId: number;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/products/${productId}/option/${optionId}`,
    config
  );
  return res.data.results;
};
// Add Product Option Value
export const addProductOptionValue = async ({
  productId,
  value,
  optionId,
}: {
  productId: number;
  value: NEW_OPTION_VALUE;
  optionId: number;
}): Promise<OPTION_VALUE> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/products/${productId}/option/${optionId}`,
    value,
    config
  );
  return res.data.results;
};

// Edit Product Option Value
export const editProductOptionValue = async ({
  productId,
  value,
  optionId,
}: {
  productId: number;
  value: OPTION_VALUE;
  optionId: number;
}): Promise<OPTION_VALUE> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/products/${productId}/option/${optionId}/${value.id}`,
    {
      name: value.name,
      price: value.price,
      quantity: value.quantity,
      sku: value.sku,
    },
    config
  );
  return res.data.results;
};
// Delete Product Option Value
export const deleteProductOptionValue = async ({
  productId,
  optionId,
  valueId,
}: {
  productId: number;
  optionId: number;
  valueId: number;
}) => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(
    `${customerUri}/products/${productId}/option/${optionId}/${valueId}`,
    config
  );
  return res.data.results;
};

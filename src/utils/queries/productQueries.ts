import axios, { AxiosRequestConfig } from "axios";
import { PRODUCT_OPTION } from "../../interfaces/products/products";
import { customerUri } from "../queries";

// export const customerUri = "https://new-version.o-now.net/customer-api";
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
export const addProductImage = async ({
  productId,
  image,
}: {
  productId: number;
  image: File;
}) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const formData = new FormData();
  formData.append("product_id", productId as any);
  formData.append("image", image);
  const res = await axios.post(
    `${customerUri}/product-images`,
    formData,
    config
  );
  return res.data.results;
};
export const editProductOption = async ({
  productId,
  option,
}: {
  productId: number;
  option: PRODUCT_OPTION;
}): Promise<PRODUCT_OPTION> => {
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
  optionId: any;
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

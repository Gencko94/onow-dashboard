import axios from "axios";

export const customerUri = "https://new-version.o-now.net/customer-api";
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
  option: any;
}) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/products/${productId}/option/${option.id}`,
    option,
    config
  );
  return res.data.results;
};

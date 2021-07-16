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

import axios from "axios";
import {
  GET_STORE_INFORMATION,
  STORE_NAME_AND_DESCRIPTION,
  STORE_SOCIAL_NETWORK,
  STORE_TECHNICAL_SUPPORT,
} from "../../interfaces/settings/store-properties/store-properties";

export const customerUri = "https://new-version.o-now.net/customer-api";

export const getStoreInformation = async (): Promise<GET_STORE_INFORMATION> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.get(`${customerUri}/store-information`, config);
  return res.data.results;
};
export const editStoreNameAndDescription = async (
  data: STORE_NAME_AND_DESCRIPTION
): Promise<STORE_NAME_AND_DESCRIPTION> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/store-name-description`,
    data,
    config
  );
  return res.data.results;
};
export const editStoreTechnicalSupport = async (
  data: STORE_TECHNICAL_SUPPORT
) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/store-support-channels`,
    data,
    config
  );
  return res.data.results;
};
export const editStoreSocialMedia = async (data: STORE_SOCIAL_NETWORK) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/store-social-media`,
    data,
    config
  );
  return res.data.results;
};
export const toggleMaintenanceMode = async (status: boolean) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.post(
    `${customerUri}/store-maintenance`,
    { maintenance: status },
    config
  );
  return res.data.results;
};
export const editStoreThemeColor = async (color: string) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/update-store-theme`,
    { color },
    config
  );
  return res.data.results;
};

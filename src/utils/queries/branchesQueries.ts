import axios, { AxiosRequestConfig } from "axios";
import {
  BRANCH,
  BRANCH_ADDRESS,
  BRANCH_INFO,
  WORKING_HOURS,
} from "../../interfaces/settings/branches/branches";
import { customerUri } from "../queries";

export const deleteBranch = async (
  id: string
): Promise<{ results: "Deleted" }> => {
  const t = localStorage.getItem("dshtid");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.delete(`${customerUri}/branches/${id}`, config);
  return res.data.results;
};
export const updateBranchInfo = async ({
  info,
  id,
}: {
  info: BRANCH_INFO;
  id: number;
}): Promise<BRANCH> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/branches/${id}/update-branch-information`,
    info,
    config
  );
  return res.data.results;
};
export const updateBranchLocation = async ({
  id,
  address,
}: {
  id: number;
  address: BRANCH_ADDRESS;
}): Promise<BRANCH> => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/branches/${id}/update-branch-location`,
    address,
    config
  );
  return res.data.results;
};
export const updateBranchWorkingHours = async ({
  id,
  days,
}: {
  id: number;
  days: WORKING_HOURS;
}) => {
  const t = localStorage.getItem("dshtid");
  const config = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
    },
  };
  const res = await axios.put(
    `${customerUri}/branches/${id}/update-branch-working-hours`,
    days,
    config
  );
  return res.data.results;
};

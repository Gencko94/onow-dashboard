import axios, { AxiosRequestConfig } from "axios";
import { customerUri } from "./queries";

interface UPLOAD_FILE_PROPS {
  href: string;
  key: string;
  file: File;
  method: "POST" | "PUT";
  onProgress?: (progress: number) => void;
}

export async function uploadFile({
  href,
  file,
  key,
  onProgress,
  method,
}: UPLOAD_FILE_PROPS) {
  const t = localStorage.getItem("dshtid");
  const formData = new FormData();
  formData.append(key, file);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: t ? `Bearer ${t}` : "",
      "Content-Type": "multipart/form-data",
    },
    method,
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      onProgress?.(percentCompleted);
    },
    data: formData,
    url: `${customerUri}${href}`,
  };

  await axios(config);
}

import type { CallApiType } from "@/types";
import type { AxiosResponse, AxiosRequestConfig } from "axios";

import axios from "axios";

import { API_BASE_URL } from "@/constants/api";

const httpService = axios.create({
  baseURL: API_BASE_URL,
});

httpService.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export { httpService };

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);

  return response.data as T;
}

async function callApi<TPayload, TResponse>({
  url,
  data,
  headers,
  method,
  params,
}: CallApiType<TPayload>): Promise<TResponse> {
  const isFormData = data instanceof FormData;
  const options: AxiosRequestConfig = {
    method,
    data,
    params,
    headers: isFormData ? {} : { "Content-Type": "application/json" },
  };

  return await apiBase<TResponse>(url, options);
}

export { callApi };

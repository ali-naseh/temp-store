import { httpService } from "@/core/http-service";

export const setToken = (token: string | null) => {
  if (token) {
    httpService.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpService.defaults.headers.common.Authorization;
  }
};

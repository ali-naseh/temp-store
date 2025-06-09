import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { ApiMethodEnums, RegisterUserReq, RegisterUserRes } from "@/types";
import { callApi } from "@/core/http-service";

const registerUser = async (
  reqData: RegisterUserReq
): Promise<RegisterUserRes> => {
  const url = "/users";

  const respose = await callApi<RegisterUserReq, RegisterUserRes>({
    url,
    method: ApiMethodEnums.POST,
    data: reqData,
  });

  return respose;
};

export const useRegisterUser = (
  options?: UseMutationOptions<RegisterUserRes, Error, RegisterUserReq, unknown>
) => {
  const mutation = useMutation({
    mutationKey: ["register-user"],
    mutationFn: (reqData: RegisterUserReq) => registerUser(reqData),
    ...options,
  });

  return {
    ...mutation,
  };
};

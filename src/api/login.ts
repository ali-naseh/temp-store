import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ApiMethodEnums, LoginUserReq, LoginUserRes } from "@/types";
import { callApi } from "@/core/http-service";

const loginUser = async (reqData: LoginUserReq): Promise<LoginUserRes> => {
  const url = "/auth/login";

  const respose = await callApi<LoginUserReq, LoginUserRes>({
    url,
    method: ApiMethodEnums.POST,
    data: reqData,
  });

  return respose;
};

export const useLoginUser = (
  options?: UseMutationOptions<LoginUserRes, Error, LoginUserReq, unknown>
) => {
  const mutation = useMutation({
    mutationKey: ["login-user"],
    mutationFn: (reqData: LoginUserReq) => loginUser(reqData),
    ...options,
  });

  return {
    ...mutation,
  };
};

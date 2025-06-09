import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { ApiMethodEnums } from "@/types";
import { callApi } from "@/core/http-service";
import { AddCartItemReq, AddCartItemRes } from "@/types/add-cart-item";

const addCartItem = async (
  reqData: AddCartItemReq
): Promise<AddCartItemRes> => {
  const url = "/carts";

  const respose = await callApi<AddCartItemReq, AddCartItemRes>({
    url,
    method: ApiMethodEnums.POST,
    data: reqData,
  });

  return respose;
};

export const useAddCardItem = (
  options?: UseMutationOptions<AddCartItemRes, Error, AddCartItemReq, unknown>
) => {
  const mutation = useMutation({
    mutationKey: ["add-cart-item"],
    mutationFn: (reqData: AddCartItemReq) => addCartItem(reqData),
    ...options,
  });

  return {
    ...mutation,
  };
};

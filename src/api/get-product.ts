import { UseQueryOptions } from "@tanstack/react-query";

import { ApiMethodEnums, GetProductReq, GetProductRes } from "@/types";
import { callApi } from "@/core/http-service";
import { useQuery } from "@tanstack/react-query";

const getProduct = async (reqData: GetProductReq): Promise<GetProductRes> => {
  const url = `/products/${reqData.productId}`;

  const respose = await callApi<undefined, GetProductRes>({
    url,
    method: ApiMethodEnums.GET,
  });

  return respose;
};

export const useGetProduct = (
  reqData: GetProductReq,
  options?: UseQueryOptions<GetProductRes, Error>
) => {
  const { data, isLoading, error } = useQuery<GetProductRes, Error>({
    queryKey: ["get-product"],
    queryFn: () => getProduct(reqData),
    ...options,
  });

  return {
    data,
    isLoading,
    error,
  };
};

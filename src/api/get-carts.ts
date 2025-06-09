import { UseQueryOptions } from "@tanstack/react-query";

import { ApiMethodEnums, GetCartRes } from "@/types";
import { callApi } from "@/core/http-service";
import { useQuery } from "@tanstack/react-query";

const getCarts = async (): Promise<GetCartRes> => {
  const url = "/carts";

  const respose = await callApi<undefined, GetCartRes>({
    url,
    method: ApiMethodEnums.GET,
  });

  return respose;
};

export const useGetCarts = (options?: UseQueryOptions<GetCartRes, Error>) => {
  const { data, isLoading, error } = useQuery<GetCartRes, Error>({
    queryKey: ["get-carts"],
    queryFn: getCarts,
    ...options,
  });

  return {
    data,
    isLoading,
    error,
  };
};

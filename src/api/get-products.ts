import { UseQueryOptions } from "@tanstack/react-query";

import { ApiMethodEnums, GetProductsRes } from "@/types";
import { callApi } from "@/core/http-service";
import { useQuery } from "@tanstack/react-query";

const getProducts = async (): Promise<GetProductsRes> => {
  const url = "/products";

  const respose = await callApi<undefined, GetProductsRes>({
    url,
    method: ApiMethodEnums.GET,
  });

  return respose;
};

export const useGetProducts = (
  options?: UseQueryOptions<GetProductsRes, Error>
) => {
  const { data, isLoading, error } = useQuery<GetProductsRes, Error>({
    queryKey: ["get-products"],
    queryFn: getProducts,
    ...options,
  });

  return {
    data,
    isLoading,
    error,
  };
};

import { useQuery } from "react-query";
import gatewayApi from "../../core/config/gatewayApi";

export const useRequest = (
    endpoint: string,
    type: string,
    queryKey: string,
    requestPayload?:any,
    page?: number,
    others?: any,
    other?: any,
    search?: string

  ) => {
    // const request = await budgetApi.get(`organizations?page=${page}&size=10`);
    return useQuery({
      queryKey: [queryKey, page, others, other, search],
      queryFn: async () => {
        const res =
          (await type) === "get"
            ? await gatewayApi.get(endpoint)
            : await gatewayApi.post(endpoint, requestPayload);
        if (res.status === 200) {
          return res?.data;
        }
      },
      // staleTime: 3000000,
      // keepPreviousData: true,
    });
  };
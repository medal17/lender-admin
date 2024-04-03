import { useQuery } from "react-query";
import gatewayApi from "../../core/config/gatewayApi";
import { ENDPOINTS } from "../constants";

export const useGetWalletHistory = (
    endpoint: string,
    type: string,
    queryKey: string,
    requestPayload?: any,
    page?: number,
    others?: any

) => {
    // const request = await budgetApi.get(`organizations?page=${page}&size=10`);
    return useQuery({
        queryKey: [queryKey, page, others],
        queryFn: async () => {
            const dependency = () => {
                let result = gatewayApi.get(`${ENDPOINTS.WALLET}my/wallet/balance`)
                result.then(async (response:any) => {
                    if (response.status===200)
                    {
                        const res =
                         await gatewayApi.post(endpoint, {walletIds:response.walletInfos.map(item => item.walletId),...requestPayload});
                    if (res.status === 200) {
                        return res?.data;
                    }}
                })
            }

        },
        // staleTime: 3000000,
        // keepPreviousData: true,
    });
};

export const useGetWalletDeatils = () => {
    return null
}
// gatewayApi.post(`${ENDPOINTS.TRANSACTION}resolve/runtime/parameters`,{...AuthPayload,...payload})


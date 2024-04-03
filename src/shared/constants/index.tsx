export const PRODUCT_ID = 'LOAN';
export const APPLICATION_CODE = 'FINHUB'

export const BASE_URL ={
    ID:'/identityservice/rest/api/',
    PASSWORD:`/identityservice/rest/api/authentication/`,
};

export const ENDPOINTS={
    GET_LOCAL_ROLES:`${BASE_URL.ID}standard/public/registration/${APPLICATION_CODE}/roles`,
    VERIFY_TOKEN:`${BASE_URL.ID}authentication/token/verification`,
    RESEND_TOKEN:`${BASE_URL.ID}resend/authentication/token`,
    UPLOAD_IMAGE:`${BASE_URL.ID}file/image/upload/${APPLICATION_CODE}`,
    REQUEST_PASSWORD_RESET:`${BASE_URL.PASSWORD}reset/password`,
    RESET_PASSWORD:`${BASE_URL.PASSWORD}update/password`,
    GET_PROFILE:`${BASE_URL.ID}fetch/myprofile/information`,
    UPDATE_PROFILE:`${BASE_URL.ID}update/myprofile/information`,
    VERIFY_PASSWORD:`${BASE_URL.ID}authentication/verify/my/password`,
    LOGOUT: `${BASE_URL.PASSWORD}authentication/verify/my/password`,
    LOAN:`/loanservice/rest/api/`,
    WALLET:`walletservice/rest/api/`,
    TRANSACTION:`transactionservice/rest/api/`
}
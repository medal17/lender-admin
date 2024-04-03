import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../shared/constants';
import { logout } from '../../shared/services/authentication';



// const URL = process.env.NODE_ENV==='production' ?'/api':
// 'http://192.168.19.59:8095';
// const URL = 'http://192.168.19.59:8095';
const URL = 'https://api.pouchii.net/';

// const URL = 'https://stagingapi.pouchii.net/';
// const URL = 'https://stagingapi.pouchii.net/qa/';
const instance = axios.create({
  baseURL: URL,
});

const refreshToken = async () => {
  try {
    const resp = await instance.get(`${BASE_URL.ID}auth/refresh`);
    return resp.data;
  } catch (e) {
    console.log("Error",e);   
  }
};

// instance.interceptors.response.use(
//   (response:any) => {
//     if (response.status === 401|| response.status === 403) { 
//       // localStorage.setItem('token', '')
//       // <Navigate to={'/login'}/>
//       console.log('yoh',response)
//     }
//     return response;
//   },
  // async (error) => {
  //   const originalRequest = error.config;

  //   if (error.response.status === 401 || error.response.status === 403 && !originalRequest._retry) {
  //     // localStorage.setItem('token','');
  //     originalRequest._retry = true;
  //     // return window.location.href='#/login'
  //     const resp = await refreshToken();
  //     const access_token = resp.response.accessToken;
  //     localStorage.setItem('token',access_token)
  //     instance.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${access_token}`;
  //     return instance(originalRequest);
  //   }

  //   return Promise.reject(error);
  // }
// );

instance.interceptors.response.use((response: AxiosResponse<any>) => {
  return response;
}, async (error: any) => {
  if (error.response.status === 401||error.response.status === 403) {
    console.log('Yoh', error?.response?.data?.responseMessage.includes('not found'))
    // Timeout error
    if (error.response.data && error?.response?.data?.responseMessage==='Session Expired'
    || error?.response?.data?.responseMessage.includes('not found')) {
      // logout(()=>localStorage.setItem('token','')); 
      localStorage.setItem('lenders_token','')
      // window.location.href = window.location.origin.includes('stagingapi')?'/login':'/')
      window.location.href = window.location.origin.includes('stagingapi')?'/login':'/'
    } else {
    }
  } else {
    console.log('Yoh', error)
  }
})


instance.interceptors.request.use((config:any) => {

  const token = localStorage.getItem('lenders_token');
  if (token && !config.url?.includes('image') && !config.url?.includes('public')) {
    // const realToken = token.substring(0,51)+token.substring(62,token.length)
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = '*'
  }

  return config;
}
);


export default instance;
import { ClientJS } from "clientjs";
import {APPLICATION_CODE, PRODUCT_ID} from './constants'
import {stringSentenceCase} from '../core/functions/index'

const client= new ClientJS();
export const AuthPayload ={
    requestChannelId:localStorage.getItem('clientId')||'12323232',
    requestChannel:'Web',
    requestChannelType:client.getDeviceType()==='mobile'
    ?
    'Mobile_Browser':'Desktop_Browser',
    requestApplicationCode:APPLICATION_CODE,
    requestPartnerCode:PRODUCT_ID,
    requestApplicationModule:"INTEGRATOR_BACKOFFICE",
    userType:"Merchant",
}
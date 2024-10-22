import { GetCustomerReqBody } from "../model/customer";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getCustomers = (body=GetCustomerReqBody()) => {
    return httpPost(`${API_HOST}/customer/read`, body);
};

export const saveCustomer = (body=GetCustomerReqBody()) => {
    return httpPost(`${API_HOST}/customer/save`, body);
};

export const deleteCustomer = (body=GetCustomerReqBody()) => {
    return httpPost(`${API_HOST}/customer/delete`, body);
};

export const getCountCustomers = (body=GetCustomerReqBody()) => {
    return httpPost(`${API_HOST}/customer/read_count`, body);
};
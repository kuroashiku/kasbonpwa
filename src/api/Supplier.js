import { GetSupplierReqBody } from "../model/supplier";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getSupplier = (body=GetSupplierReqBody()) => {
    return httpPost(`${API_HOST}/supplier/read`, body);
};

export const saveSupplier = (body=GetSupplierReqBody()) => {
    return httpPost(`${API_HOST}/supplier/save`, body);
};

export const deleteSupplier = (body=GetSupplierReqBody()) => {
    return httpPost(`${API_HOST}/supplier/delete`, body);
};

export const getCountSupplier = (body=GetSupplierReqBody()) => {
    return httpPost(`${API_HOST}/supplier/read_count`, body);
};

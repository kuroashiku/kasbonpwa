import { GetTaxReqBody } from "../model/tax";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getTax = (body=GetTaxReqBody()) => {
    return httpPost(`${API_HOST}/pajak/read`, body);
};

export const saveTax = (body=GetTaxReqBody()) => {
    return httpPost(`${API_HOST}/pajak/save`, body);
};

export const deleteTax = (body=GetTaxReqBody()) => {
    return httpPost(`${API_HOST}/pajak/delete`, body);
};

export const getCountTax = (body=GetTaxReqBody()) => {
    return httpPost(`${API_HOST}/pajak/read_count`, body);
};

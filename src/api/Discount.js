import { GetDiscountReqBody } from "../model/discount";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getDiscount = (body=GetDiscountReqBody()) => {
    return httpPost(`${API_HOST}/diskon/read`, body);
};

export const saveDiscount = (body=GetDiscountReqBody()) => {
    return httpPost(`${API_HOST}/diskon/save`, body);
};

export const deleteDiscount = (body=GetDiscountReqBody()) => {
    return httpPost(`${API_HOST}/diskon/delete`, body);
};

export const getCountDiscount = (body=GetDiscountReqBody()) => {
    return httpPost(`${API_HOST}/diskon/read_count`, body);
};

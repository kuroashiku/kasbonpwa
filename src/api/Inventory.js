import { GetInventoryReqBody } from "../model/inventory";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getPo = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/po/read`, body);
};

export const getPoItem = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/po/poitem`, body);
};

export const savePo = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/po/save`, body);
};

export const approvePo = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/po/approve`, body);
};

export const deletePo = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/po/delete`, body);
};

export const receiptPo = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/po/receipt`, body);
};

export const getRcv = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/receive/read`, body);
};

export const getRcvPoItem = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/receive/poitem`, body);
};

export const saveRcv = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/receive/save`, body);
};

export const payRcv = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/receive/pay`, body);
};

export const receiptRcv = (body=GetInventoryReqBody()) => {
    return httpPost(`${API_HOST}/receive/receipt`, body);
};
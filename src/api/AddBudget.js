import { GetAddbudgetReqBody } from "../model/addbudget";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getAddbudget = (body=GetAddbudgetReqBody()) => {
    return httpPost(`${API_HOST}/belanja/read`, body);
};

export const saveAddbudget = (body=GetAddbudgetReqBody()) => {
    return httpPost(`${API_HOST}/belanja/save`, body);
};

export const deleteAddbudget = (body=GetAddbudgetReqBody()) => {
    return httpPost(`${API_HOST}/belanja/delete`, body);
};


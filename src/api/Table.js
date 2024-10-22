import { GetTableReqBody } from "../model/table";
import { httpPost, API_HOST } from "./Global";

export const RESPONSE_OK = 200;
export const RESPONSE_NOK = 500;
export const IS_DEMO = true;

export const getTable = (body=GetTableReqBody()) => {
    return httpPost(`${API_HOST}/meja/read`, body);
};

export const saveTable = (body=GetTableReqBody()) => {
    return httpPost(`${API_HOST}/meja/save`, body);
};

export const deleteTable = (body=GetTableReqBody()) => {
    return httpPost(`${API_HOST}/meja/delete`, body);
};
